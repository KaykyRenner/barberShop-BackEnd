const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');

const getAllCliente = async (page,limit,filter) => {
    try{
        const pegaPage = Number(page)
        const pegaLimit = Number(limit)
        if(isNaN(pegaPage)||pegaPage <=0|| isNaN(pegaLimit)||pegaLimit<=0){
            return { 
                message: 'Os parâmetros "page" e "limit" devem ser números inteiros positivos.'+ pegaLimit+ pegaPage, 
                status: StatusCodes.BAD_REQUEST 
            }; 
        }

        const offset = (pegaPage - 1) * pegaLimit
        const resultado = await knex('cliente')
        .where('nomeCliente', 'like', `%${filter}%`)
        .limit(pegaLimit)
        .offset(offset)
        if(Array.isArray(resultado) &&resultado.length > 0){
            return {
                message:'encontrado',
                status:StatusCodes.OK,
                cliente:resultado
            }
        } else{
            return {
                message:'nenhum resultado encontrado',
                status:StatusCodes.NOT_FOUND}
        }
    }catch(err){
        console.error('Erro ao encontrar cliente:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }
}
module.exports = {getAllCliente}