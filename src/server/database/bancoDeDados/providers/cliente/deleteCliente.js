const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const deleteCliente= async (id,role) => {
    try{
        if(role !== 'cliente'){
            return {
                message:'você não tem permissão',
                status:StatusCodes.FORBIDDEN
            }
        }
        const resultado = await knex('cliente').where('id',id).delete()
        if(resultado){
            return {message:'cliente deletado', status:StatusCodes.OK}
        }else{
            return {message:'cliente não encontrado', status:StatusCodes.NOT_FOUND}
        }
    }catch(err){
        console.error('Erro ao deletar cliente:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }
}
module.exports = {deleteCliente}