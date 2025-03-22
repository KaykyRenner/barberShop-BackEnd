const{ StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const count = async (filter) => {
    try{
        const resultado = await knex('barbeiros')
        .where('nomeBarbeiro','like',`%${filter}%`)
        .count('* as count ')
        const totalCount = resultado[0]?.count || 0
        return Number(totalCount)
    }catch(err){
        console.log('erro ao contar barbeiro',err)
        return 0;
    }
}
module.exports = {count}