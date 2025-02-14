const criarTabelaBarbeiro = async (conexao) => {
    try {
        const exists = await conexao.schema.hasTable('barbeiros');
        if (!exists) {
            await conexao.schema.createTable('barbeiros', (table) => {
                table.bigIncrements('id').primary();  // 'id' é BIGINT UNSIGNED
                table.string('nomeBarbeiro').notNullable();
                table.string('emailBarbeiro').unique().notNullable();
                table.bigInteger('telefoneBarbeiro').unique().notNullable();
                table.bigInteger('user_id').unsigned().notNullable();

                // Garante que a tabela usuarios existe antes de referenciar
                table.foreign('user_id').references('id').inTable('usuarios').onDelete('CASCADE');
            });
            console.log('Tabela Barbeiros criada com sucesso');
        } else {
            console.log('Tabela Barbeiros já existe');
        }
    } catch (err) {
        console.log('Erro ao criar tabela Barbeiros:', err);
    }
};

module.exports = { criarTabelaBarbeiro };
