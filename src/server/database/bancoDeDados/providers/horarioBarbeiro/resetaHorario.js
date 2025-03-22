const knex = require("../../database");

const resetaHorarioDiarios = async()=>{
    try{
        await knex("horarioBarbeiro")
        .update({
            status:"disponível",
            cliente_id:null
        })
        .where("data",new Date().toISOString().slice(0,10))
        console.log("horarios resetados com sucesso")
    }catch(err){
        console.log("erro ao resetar horarios", err)
    }
}
module.exports = {resetaHorarioDiarios}