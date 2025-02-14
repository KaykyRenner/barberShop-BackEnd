const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');

const count = async (filter) => {
    try{
    const resultado = knex('cliente').where('nomeCliente','like',`%${filter}%`)
    return Number.isInteger(Number(resultado)) ? Number(resultado):0
    }catch(err){
        console.log('erro ao contar cliente', err)
        return 0
    }
}
module.exports = {count}