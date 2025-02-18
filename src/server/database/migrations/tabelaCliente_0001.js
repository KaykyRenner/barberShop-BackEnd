const createTabelaCliente = async (conexao) => {
    try {
        // Verificar se a tabela existe antes de criar
        const exists = await conexao.schema.hasTable('cliente');
        if (!exists) {
            await conexao.schema.createTable('cliente', (table) => {
            table.bigIncrements('id').primary();
            table.string('nomeCliente').notNullable();
            table.string('emailCliente').unique().notNullable();
            table.bigInteger('telefoneCliente').unique().notNullable();
            table.bigInteger('user_id').unsigned().notNullable();
            table.bigInteger('barbeiro_Id').unsigned()  // Adicione .unsigned()
                    .nullable()
                    .references('id')
                    .inTable('barbeiros')
                    .onUpdate('CASCADE')
                    .onDelete('RESTRICT');
            table.foreign('user_id').references('id')
            .inTable('usuarios').onDelete('CASCADE')
            });
            console.log('Tabela Cliente criada com sucesso');
        } else {
            console.log('Tabela Cliente já existe');
        }
    } catch (err) {
        console.log('Erro ao criar tabela Cliente:', err);
    }
};

module.exports = { createTabelaCliente };
