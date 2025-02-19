const {StatusCodes} = require('http-status-codes')
const knex = require('../../database');
const selecionandoBarbeiro = async (id,ClienteId) => {
    try{
        const BarbeiroExisting = await knex('barbeiros')
        .select('nomeBarbeiro')
        .where({id})
        .first()
        if(!BarbeiroExisting){
            return {message:'barbeiro não existe',status:StatusCodes.NOT_FOUND}
        }
        
        const idCliente = await knex('cliente')
        .select('id')
        .where({user_id:ClienteId})
        .first()
        if(idCliente){return {message:'cliente não existe',status:StatusCodes.NOT_FOUND}
    }

        const insertCliente = idCliente.id
        const InsertBarberInCliente = await knex('cliente')
        .where({id:insertCliente})
        .update({barbeiro_Id:id})

        return {message: 'Barbeiro atribuído ao cliente com sucesso',status: StatusCodes.OK,}

    }catch(err){
        console.error('Erro ao selecionar barbeiro ', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }
}
module.exports = {selecionandoBarbeiro}