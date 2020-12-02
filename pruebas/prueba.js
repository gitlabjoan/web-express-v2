const bcrypt = require('bcryptjs')

const password ='1234'



const getHash = async (password) => {
    const hash =  await bcrypt.hash(password, 8);
    return hash;
}

getHash(password);

const isRight = async (password) => {
    const pass = await getHash(password)
    const coincidencia = bcrypt.compare(password, pass)

    if (!coincidencia){
        console.log('COINCIDENCIA NO CORRECTA');
    }else{
        console.log('COINCIDENCIA CORRECTA');
    }
}
console.log('is RIGHT?------', isRight('1234'));