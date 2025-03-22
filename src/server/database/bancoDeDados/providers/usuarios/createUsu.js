const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');
const {hashPassowrd} = require('../../../../shared/services/passowrdHash')
const createUsuario = async (senha,email,role) => {
    try{
        const hashSenha = await hashPassowrd(senha)
        const exists = await knex('usuarios')
        .select('email')
        .where('email',email)
        .first()
        if(exists){
            return{
            message: 'Email ou Senha já cadastrado',
            status: StatusCodes.BAD_REQUEST
        };}
        const [id] = await knex('usuarios')
        .insert({senha:hashSenha,email,role})
        const buscaResultado = await knex('usuarios')
        .select('role')
        .where('id',id)
        .first()
        return{
            message:'usuario Cadastrado',
            data:buscaResultado,
            status:StatusCodes.CREATED
        }
    }catch(err){
        console.error('Erro ao criar usuário:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        };
    }
}
module.exports = {createUsuario}