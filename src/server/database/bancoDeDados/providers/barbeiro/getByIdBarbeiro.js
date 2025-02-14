const{ StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const getById = async (id) =>{
    try{
        const resultado = await knex('barbeiros').where('id',id).first()
        if(resultado){
            return {message:'id encontrado',status:StatusCodes.OK, barbeiro:resultado}
        } else{
            return{status:StatusCodes.NOT_FOUND,message:'id não encontrado'}
        }
    }catch(err){
        console.log('erro ao pegar barbeiro',err)
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }
    }
}
module.exports = {getById}