const jsonwebtoken = require('jsonwebtoken');

const payload = {_id:'123'}

const secretKey = 'secreto';

const firmar = async ( payload, secretKey) =>{
    const jwt = await jsonwebtoken.sign(payload,secretKey)
    console.log(jwt);
}

firmar(payload, secretKey)

const verificar = async ( jwt, secretKey) =>{
    const decoded = await jsonwebtoken.verify(jwt,secretKey)
    console.log(decoded);
}
verificar('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjMiLCJpYXQiOjE2MDY5OTAxOTV9.mhqDpInM0MWvrLSt2emXStEJVQdoCUFxHrzE_FGc5yc', secretKey)