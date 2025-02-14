const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const getByEmail = async (email) => {
    try{
        const resultado = await knex('usuarios').where('email',email).first()
        if(resultado){
            return {
                usuario:resultado,
                status:StatusCodes.OK,
                message:'email encontrado'
            }
        } else{
            return {
                status:StatusCodes.BAD_REQUEST,
                message:'não encontrado'
            }
        }
    }catch(err){
        console.error('Erro ao encontrar email:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        };
    }
}
module.exports = {getByEmail}