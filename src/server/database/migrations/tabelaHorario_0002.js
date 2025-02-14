const criaTabelaHorario = async (conexao) => {
    try {
        const exists = await conexao.schema.hasTable('horarioBarbeiro');
        if (!exists) {
            await conexao.schema.createTable('horarioBarbeiro', (table) => {
                table.bigIncrements('id').primary();
                table.bigInteger('barbeiro_id').unsigned().notNullable();
                table.date('data').notNullable();  // Corrigido para 'date'
                table.time('horario').notNullable();
                table.enu('status', ['disponível', 'reservado']).defaultTo('disponível');
                table.bigInteger('cliente_id').unsigned().nullable();  // Corrigido para 'nullable'
                
                table.foreign('barbeiro_id').references('id').inTable('barbeiros').onDelete('CASCADE');
                table.foreign('cliente_id').references('id').inTable('cliente').onDelete('SET NULL');
                console.log('tabela horarios criada com sucesso')
            });
        } else{
            console.log('Tabela horário já existe');
        }
    } catch (err) {
            console.log('Erro ao criar tabela Horário',err);
    
    }
};

module.exports = { criaTabelaHorario };
