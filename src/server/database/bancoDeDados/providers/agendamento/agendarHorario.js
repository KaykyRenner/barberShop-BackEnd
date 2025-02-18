const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const reservarHorario = async (reservar,idHorario,role) => {
    try{
        if(role !== 'cliente'){
            return {
                message:'você não tem permissão',
                status:StatusCodes.FORBIDDEN
            }
        }
        if(!idHorario){
            return {
                status: StatusCodes.BAD_REQUEST,
                message: 'O ID do horário é obrigatório.'
            }
        }
        const horarioExist = await knex('horarioBarbeiro')
        .select('id','status')
        .where({id:idHorario})
        .first()
        if(!horarioExist || horarioExist.status === 'reservado'){
            return {
                message:'horario não encontrado ou reservado',
                status:StatusCodes.NOT_FOUND
        }}
        
        const resultado = await knex('horarioBarbeiro')
            .where({id:idHorario})
            .update({status:reservar})
        if(resultado){
            const horarioReservado = await knex('horarioBarbeiro')
            .select('horario')
            .where({id:idHorario})
            .first()
            return {
                status:StatusCodes.OK,
                message:'horario reservado com sucesso',
                horarioReservado
            }
        }else{
            return{
                message:'não foi possível reservar horario',
                status:StatusCodes.BAD_REQUEST
            }
        }
        }
    catch(err){
        console.error('Erro ao agendar horario ', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }
} 
module.exports = {reservarHorario}