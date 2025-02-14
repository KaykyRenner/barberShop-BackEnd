const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const getAllHorario = async (id,page,limit,filter) => {
    try{
        const pegaPage = Number(page)
        const pegaLimit = Number(limit)
        if(isNaN(pegaPage)||pegaPage<=0||isNaN(pegaLimit)||pegaLimit<=0){
            return {status:StatusCodes, message: 'Os parâmetros "page" e "limit" devem ser números inteiros positivos.'+ pegaLimit+ pegaPage }
        }
        const offSet = (pegaPage - 1) * limit
        const resultado = await knex('horarioBarbeiro')
        .select('horario','status','id')
        .where('barbeiro_id',id)
        .andWhere('status','like',`%${filter}%`)
        .offset(offSet)
        .limit(pegaLimit)
        .orderBy('horario', 'asc')

        if(Array.isArray(resultado) && resultado.length>0){
            return {horarios:resultado,message:'encontrado',status:StatusCodes.OK}
        } else{
            return {message:'não encontrado', status:StatusCodes.NOT_FOUND}
        }
    }catch(err){
        console.error('Erro ao buscar horarios:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
    }  
}
module.exports = {getAllHorario}