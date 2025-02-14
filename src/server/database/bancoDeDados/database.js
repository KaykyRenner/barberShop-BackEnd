const knex = require('knex'); 
// Configuração do Knex para o MySQL 
const dbLocal = knex({ 
    client: 'mysql2', 
    connection: { 
        host: process.env.DB_HOST, 
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD, 
        database: process.env.DB_NAME, 
    }, 
});



module.exports = {dbLocal}
