const {StatusCodes} = require("http-status-codes")
const knex = require("../../database")
const count = async (filter,id)=>{
    try{
        const resultado = await knex("horarioBarbeiro")
        .where("barbeiro_id",id)
        .andWhere("status","like",`%${filter}%`)
        .count("* as count ")
        const totalCount = resultado[0]?.count || 0
        return Number(totalCount)
    }catch(err){
        console.log("erro ao contar horarios", err)
        return 0
    }
}
module.exports = {count}