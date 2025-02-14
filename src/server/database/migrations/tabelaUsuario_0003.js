const criaTabelaUsu = async (conexão) => {
    try {
        const exists = await conexão.schema.hasTable('usuarios');
        if (!exists) {
            // Espera pela criação da tabela antes de retornar
            await conexão.schema.createTable('usuarios', (table) => {
                table.bigIncrements('id').primary().index();
                table.string('email').index().unique().notNullable().checkLength('>', 6);
                table.string('senha').notNullable().checkLength('>', 6);
                table.enu('role', ['cliente', 'barbeiro', 'admin']).notNullable().defaultTo('cliente');
                table.timestamp('created_at').defaultTo(conexão.fn.now());
                table.timestamp('updated_at').defaultTo(conexão.fn.now());
            });
            console.log('Tabela usuarios criada com sucesso');
            return true;  // Retorna verdadeiro após a criação bem-sucedida
        } else {
            console.log('Tabela usuarios já existe');
            return true;  // Retorna verdadeiro se a tabela já existir
        }
    } catch (err) {
        console.log('Erro ao criar tabela usuarios:', err);
        return false;  // Retorna falso caso ocorra um erro
    }
};

module.exports ={criaTabelaUsu}