const {genSalt,compare,hash} = require('bcryptjs')

const salt = 8
const hashPassowrd = async (senha) =>{
    const saltGeneration = await genSalt(salt)
    
    return await hash(senha,saltGeneration)
}

const verifyPassowrd = async (senha, hashSenha) =>{
    return await compare(senha,hashSenha)
}

module.exports = {hashPassowrd,verifyPassowrd}