const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const updateHorario =async (id,horario,role) => { 
    try{
        if(role !== 'barbeiro'){
            return {
                status:StatusCodes.FORBIDDEN,
                message:'você não tem permisão'
            }
        }
        const resultado = await knex('horarioBarbeiro').where({id})
        .update({horario})
        if(resultado){
            const horarioAtualizado =await knex('horarioBarbeiro')
            .select('horario')
            .where({id})
            .first()
            return {
                message:'horario atualizado',
                status:StatusCodes.OK,
                horario:horarioAtualizado
            }     
        } else{
            return {
                status:StatusCodes.NOT_FOUND,
                message:'horario não encontrado'
            }
        }
    }catch(err){
        console.error('Erro ao atualizar horario:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }

}
module.exports = {updateHorario}