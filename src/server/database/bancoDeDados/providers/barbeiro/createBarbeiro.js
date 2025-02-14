const{ StatusCodes } = require('http-status-codes');
const knex = require('../../database'); // Ajuste o caminho conforme necessário

// Função para criar um barbeiro
const createBarbeiro = async (nomeBarbeiro, emailBarbeiro, telefoneBarbeiro,user_id) => {
    try {
        const existingBarbeiro = await knex('barbeiros')
        .select('id')
        .where('emailBarbeiro', emailBarbeiro)
        .first();
        if (existingBarbeiro) {
            // Caso o email já exista, retorna um erro de duplicação
            return {
                message: 'O e-mail já está cadastrado.',
                status: StatusCodes.BAD_REQUEST  // Aqui, retornando o valor numérico
            };
        }
        // Inserir um novo barbeiro na tabela
        await knex('barbeiros').insert({
            nomeBarbeiro,
            emailBarbeiro,
            telefoneBarbeiro,
            user_id
        });
        // Buscar o ID do barbeiro recém inserido
        const resultado = await knex('barbeiros')
            .select('id', 'nomeBarbeiro', 'emailBarbeiro', 'telefoneBarbeiro')
            .where('emailBarbeiro', emailBarbeiro)
            .first();
        return {
            status: StatusCodes.CREATED, // Retornando o código correto (201)
            barbeiro: resultado,
            message:'barbeiro criado'
        };
    } catch (err) {
        // Log do erro no servidor
        console.error('Erro ao cadastrar barbeiro:', err.message);

        // Retorna a resposta de erro com status apropriado e mensagem detalhada
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR  // Retornando o código correto (500)
        };
    }
};

module.exports = { createBarbeiro };
