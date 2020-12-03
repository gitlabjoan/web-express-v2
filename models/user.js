const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email no es válido')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.includes('password')){
                throw new Error('El password no debe contener password')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Edad debe ser un valor positivo')
            }
        }
    },
    tokens:[
        {
            toke:{
                type: String,
                required: true
            }
        }
    ]
})
const User = mongoose.model('User', userSchema)

userSchema.methods.generateAuthToken = async () =>{
    const user = this
    const token = await JsonWebTokenError.sign({_id: user._id.toString()},'secreto',{expireIn:'7 days'})
    user.tokens = user.tokens.concat({token:token})
    await user.save();
    return token;
}

userSchema.statics.findUserByCredentials = async (email, password) =>{
    const user = await User.findOne({email:email});
    if (!user){
        throw new Error('Email o password no válidos');
    }
    const isOK = bcryptjs.compare(password, user.password)
    if(!isOK){
        throw new Error('Email o password no válido')
    }
    return user;
}
userSchema.pre('save', async (next) => {
    const user = this
    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password, 8)
    }
    next()
})

module.exports = User