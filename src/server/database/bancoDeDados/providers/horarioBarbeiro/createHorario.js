const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const HorarioPadrao = async (horario,data,barbeiro_Id,role) => {
    try{
        if(role !== 'barbeiro'){
            return {
                status:StatusCodes.FORBIDDEN,
                message:'você não tem permisão'
            }
        }
        const resultado = await knex('horarioBarbeiro').insert({horario,data,barbeiro_Id})
        if(resultado.length>0){
            return {message:'horário criado', status:StatusCodes.CREATED,horario:resultado }
        } else{
            return {message:'erro ao criar horario', status:StatusCodes.BAD_REQUEST}
        }
    }catch(err){
        console.error('Erro ao criar horario ', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }
}
module.exports = {HorarioPadrao}