const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const cancelarHorario = async (disponivel,idHorario,role,user_id) => {
    try{
        if(role !== 'cliente'){
            return {message:'você não tem permissão',status:StatusCodes.FORBIDDEN}
        }
        const cliente = await knex('cliente')
        .select('id','barbeiro_id')
        .where({user_id})
        .first()
        if(!cliente){
            return {message: 'Cliente não encontrado.',status: StatusCodes.NOT_FOUND,};
        }
        const {id:clienteId, barbeiro_id:BarberCliente} = cliente
        if(BarberCliente == null){
            return {
                message: 'nenhum horario para ser cancelado',
                status: StatusCodes.BAD_REQUEST,
            };
        }
        if(!idHorario){
            return {status: StatusCodes.BAD_REQUEST,message: 'O ID do horário é obrigatório.'}
        }
        const horario = await knex('horarioBarbeiro')
        .select('status','cliente_id')
        .where({id:idHorario})
        .first()

        if (!horario) { // Adicionada verificação se o horário realmente existe no banco
            return { message: 'Horário não encontrado.', status: StatusCodes.NOT_FOUND };
        }

        const {status:status, cliente_id:clienteIdHorario} = horario
        if (status === 'disponível') {
            return { message: 'Este horário já está disponível e não pode ser cancelado.', status: StatusCodes.BAD_REQUEST };}

        if(clienteIdHorario !== clienteId ){
            return {message:'você precisa selecionar um  horario antes de cancelar ele',status:StatusCodes.BAD_REQUEST}
        }

        const resultado = await knex('horarioBarbeiro')
        .where({id:idHorario})
        .update({status:disponivel,cliente_id:null})
        if(resultado){
            return {
                status:StatusCodes.OK,
                message:'horario reservado com sucesso',
                horarioReservado:{horario: status}
            }

        }else{
            return{message:'não foi possível reservar horario',status:StatusCodes.BAD_REQUEST}
        }
    }catch(err){

    }
}
module.exports = {cancelarHorario}