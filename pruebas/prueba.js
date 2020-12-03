const bcrypt = require('bcryptjs')

const password1 ='1234';

const getHash = async (password) => {
    const hash =  await bcrypt.hash(password, 8);
    return hash;
}

const isRight = async (password1, password2) => {
   


    const pass1 = await getHash(password1)
    const pass2 = await getHash(password2)
    console.log('pass1',pass1);
    console.log('pass2',pass2);
    const coincidencia = async(pass1, pass2) =>{
        return await bcrypt.compare(pass1, pass2)
    } 

    if (!coincidencia){
        console.log('COINCIDENCIA NO CORRECTA');
    }else{
        console.log('COINCIDENCIA  CORRECTA');
    }
}
const password2 = '12234';
