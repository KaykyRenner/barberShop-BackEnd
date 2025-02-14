const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');

const updateCliente = async (id,nomeCliente,emailCliente,telefoneCliente) => {
    try{
        const resultado = await knex('cliente')
        .where({id})
        .update({nomeCliente,emailCliente,telefoneCliente})
        if(resultado){
           const clienteAtualizado = await knex('cliente')
           .select('nomeCliente','emailCliente','telefoneCliente')
           .where({id}).first()
           return {message:'cliente atualizado', cliente:clienteAtualizado,status:StatusCodes.OK}
        } else{
            return {message:'cliente não encontrado', status:StatusCodes.NOT_FOUND}
        }
    }catch(err){
        console.error('Erro ao atualizar cliente:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }
}
module.exports= {updateCliente}