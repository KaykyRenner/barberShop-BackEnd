const { StatusCodes } = require('http-status-codes');
const knex = require('../../database');

const createCliente = async (nomeCliente, emailCliente, telefoneCliente,user_id) => {
    try {
        // Verifica se já existe um cliente com o mesmo email ou telefone
        const existingCliente = await knex('cliente')
            .select('id', 'nomeCliente', 'emailCliente', 'telefoneCliente','barbeiro_Id')
            .where('emailCliente', emailCliente)
            .orWhere('telefoneCliente', telefoneCliente)
            .first();

        if (existingCliente) {
            return {
                message: 'Email ou telefone já cadastrado',
                status: StatusCodes.BAD_REQUEST
            };
        }

        // Insere o novo cliente
        const [id] = await knex('cliente')
            .insert({
                nomeCliente,
                emailCliente,
                telefoneCliente,
                barbeiro_Id:null,
                user_id
            });

        // Retorna o cliente cadastrado
        const newCliente = await knex('cliente')
            .select('id', 'nomeCliente', 'emailCliente', 'telefoneCliente')
            .where('id', id)
            .first();

        return {
            message: 'cliente Cadastrado',
            cliente: newCliente,
            status: StatusCodes.CREATED
        };
    } catch (err) {
        console.error('Erro ao criar cliente:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        };
    }
};

module.exports = { createCliente };
