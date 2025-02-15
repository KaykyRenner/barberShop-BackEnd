const knex = require('knex'); 
// Configuração do Knex para o MySQL 
const db = knex({ 
    client: 'mysql2', 
    connection: { 
        host: process.env.DB_HOST, 
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD, 
        database: process.env.DB_NAME,
        port:process.env.DB_PORT
        
    },
    pool: {min:2,max:10},
    acquireConnectionTimeout:10000,
    debug:true
});



module.exports = db
