const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const criatHorario = async (horario,data,barbeiro_Id,role) => {
    try{
        if(role !== 'barbeiro'){
            return {
                status:StatusCodes.FORBIDDEN,
                message:'você não tem permisão'
            }
        }

        const horarioFormatado = horario[0].length === 5?`${horario[0]}:00`:horario[0]
        console.log(horarioFormatado)
        const horarioExisting = await knex('horarioBarbeiro')
        .select('horario')
        .where('barbeiro_id',barbeiro_Id)
        .andWhere('horario',horarioFormatado)
        .first()
        if (horarioExisting) return {message:'horário já existe', status:StatusCodes.BAD_REQUEST }
        
        const resultado = await knex('horarioBarbeiro').insert({horario,data,barbeiro_Id})
        if(resultado.length>0){
            return {message:'horário criado', status:StatusCodes.CREATED,horario:resultado }
        } else{
            return {message:'erro ao criar horario', status:StatusCodes.BAD_REQUEST}
        }
    }catch(err){
        console.error('Erro ao criar horario ', err);
        return {
            
            message: 'Erro interno no servidor ',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }
}
module.exports = {criatHorario}