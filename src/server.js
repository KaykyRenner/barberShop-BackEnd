const app = require("./server/app");
const PORT = process.env.PORT || 3100; // Corrigido o nome da variável de ambiente
const db = require("./server/database/bancoDeDados/database");
const { tabelasController } = require("./server/database/indexTables");

const startServer = async () => {
    try {
        console.log("Inicializando o banco de dados...");

        // Criar tabela de usuários primeiro
        const tabelaUsuarioCriada = await tabelasController.criaTabelaUsu(db);
        
        // Se a tabela 'usuarios' foi criada (ou já existia), prosseguir com as outras
        if (tabelaUsuarioCriada) {
            console.log("Tabela 'usuarios' criada. Criando as demais tabelas...");
            await tabelasController.criarTabelaBarbeiro(db);
            await tabelasController.createTabelaCliente(db);
            await tabelasController.criaTabelaHorario(db);
        } else {
            console.log("Erro ao criar a tabela 'usuarios'. Outras tabelas não serão criadas.");
            return; // Encerra a função caso a criação falhe
        }

        console.log("Tabelas criadas com sucesso. Iniciando o servidor...");

        // Iniciar o servidor apenas depois que as tabelas foram criadas
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Erro ao inicializar o servidor:", error);
    }
};

startServer();
