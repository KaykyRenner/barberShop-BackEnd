const{ StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const count = async (filter) => {
    try{
        const resultado = knex('barbeiros')
        .where('nomeBarbeiro','like',`%${filter}%`)
        .count('* as count ')
        return Number.isInteger(Number(resultado))? Number(resultado):0
    }catch(err){
        console.log('erro ao contar barbeiro',err)
        return 0;
    }
}
module.exports = {count}