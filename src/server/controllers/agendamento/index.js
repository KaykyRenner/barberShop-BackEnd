const agendar = require('./agendarHorario')
const selecionaBarbeiro = require('./selecionarBarbeiro')
const barbeiroController = {
    ...agendar,
    ...selecionaBarbeiro
}
module.exports = barbeiroController