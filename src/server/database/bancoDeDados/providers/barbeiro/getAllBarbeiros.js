const{ StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const getAllBarbeiros = async(page,limit,filter)=>{
    try{      
        const pegaPage = Number(page);
        const pegaLimit = Number(limit)
        if (filter.trim() === '') {
            filter = ''; //
          }
        if(isNaN(pegaPage)||pegaPage <=0|| isNaN(pegaLimit)||pegaLimit<=0){
            return { 
                message: 'Os parâmetros "page" e "limit" devem ser números inteiros positivos.', 
                status: StatusCodes.BAD_REQUEST 
            }; 
        }
        const offset = (pegaPage - 1)*limit;
        const resultado = await knex('barbeiros')
        .where('nomeBarbeiro', 'like', `%${filter}%`)
        .limit(pegaLimit)
        .offset(offset)
        
      
        if(Array.isArray(resultado) && resultado.length>0){
            return {data:resultado,message:'encontrado',status:StatusCodes.OK}
        } else{
            return {message:'não encontrado', status:StatusCodes.NOT_FOUND}
        }
        }catch(err){
            return {
                message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
            }
    }
}
module.exports = {getAllBarbeiros}