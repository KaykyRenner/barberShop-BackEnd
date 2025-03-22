const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const { where } = require('sequelize');
const getAllHorario = async (role,usuario_id,id,page,limit,filter) => {
    try{
       if(role === 'cliente'){
        const negaCliente = await knex('cliente')
        .select('id','barbeiro_id')
        .where('user_id',usuario_id)
        .first()
        if(!negaCliente){
            return{
                message:'cliente nao encontrado',
                status:StatusCodes.NOT_FOUND
            }
        }
        if(Number(negaCliente.barbeiro_id) !== Number(id)){
            return{
                message:'voce so pode acessar horarios de barbeiro selecionado',
                status:StatusCodes.FORBIDDEN
            }
        }
       }
        if (role === 'barbeiro') {
            const negaBarbeiro = await knex('barbeiros')
                .select('id')
                .where('user_id', usuario_id)
                .first();
                console.log(negaBarbeiro.id, id)
        
            if (!negaBarbeiro) {
                return {
                    message: 'Barbeiro não encontrado.',
                    status: StatusCodes.NOT_FOUND
                };
            }
        
            if (Number(negaBarbeiro.id) !== Number(id)) {
                return {
                    message: 'Você só pode acessar seus próprios horários.',
                    status: StatusCodes.FORBIDDEN
                };
            }
        }
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