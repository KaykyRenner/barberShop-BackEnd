const agendar = require('./agendarHorario')
const selecionaBarbeiro = require('./selecionarBarbeiro')
const cancelarHorario = require('./cancelarHorario')
const barbeiroController = {
    ...agendar,
    ...selecionaBarbeiro,
    ...cancelarHorario
}
module.exports = barbeiroController