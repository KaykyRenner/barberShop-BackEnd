const{ StatusCodes } = require('http-status-codes');
const knex = require('../../database'); // Ajuste o caminho conforme necessário
const UpdateBarbeiro = async(id,nomeBarbeiro,emailBarbeiro,telefoneBarbeiro ) =>{
    try{
        const resultado = await knex('barbeiros')
        .where({id})
        .update({nomeBarbeiro,emailBarbeiro,telefoneBarbeiro})
        if(resultado){
            const barbeiroAtualizado = await knex('barbeiros')
            .select('id', 'nomeBarbeiro', 'emailBarbeiro', 'telefoneBarbeiro')
            .where({id})
            .first()
            return {message:'barbeiro Atualizado', barbeiro:barbeiroAtualizado, status:StatusCodes.OK}
        } else{
            return {message:'barbeiro não encontrado', status:StatusCodes.NOT_FOUND}
        }
        
    }catch(err){
        console.log('erro ao atualizar barbeiro',err)
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
    }
}}
module.exports = {UpdateBarbeiro}