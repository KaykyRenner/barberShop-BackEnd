const barbeiro = require('./tabelasBarbeiro_0000')
const cliente = require('./tabelaCliente_0001')
const horario = require('./tabelaHorario_0002')
const usuario = require('./tabelaUsuario_0003')
const tabelasController = {
    ...barbeiro,
    ...cliente,
    ...horario,
    ...usuario
   
}
module.exports = tabelasController