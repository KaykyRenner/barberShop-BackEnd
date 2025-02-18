const{ StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const deleteBarbeiro = async (id,role)=>{
    try{
        if(role !== 'barbeiro'){
            return {
                status:StatusCodes.FORBIDDEN,
                message:'você não tem permisão'
            }
        }
        const resultado = await knex('barbeiros').where('id',id).delete()
        if(resultado){
            return {message:'barbeiro deletado',status:StatusCodes.OK }
        } else{
            return {message:'barbeiro não encontrado', status:StatusCodes.NOT_FOUND}
        }
    }catch(err){
        console.log('erro ao deletar barbeiro',err)
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR}
    }
}
module.exports = {deleteBarbeiro}