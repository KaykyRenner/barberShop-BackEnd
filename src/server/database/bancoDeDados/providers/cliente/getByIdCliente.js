const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const getByIdCliente = async (id) => {
    try{
        const resultado = await knex('cliente').where('id',id).first()
        if(resultado){
            return {message:'cliente encontrado', cliente:resultado,status:StatusCodes.OK}
        } else{
            return {message:'id não encontrado', status:StatusCodes.NOT_FOUND}
        }
    }catch(err){
        console.error('Erro ao pegar cliente:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }
}
module.exports = {getByIdCliente}