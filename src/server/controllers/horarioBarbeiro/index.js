const update = require('./AtualizarhorariosPadrao')
const getAll = require('./getAllHorarioBarbeiro')
//const del = require('./deleteCliente')
//const del = require('./deleteCliente')
const horarioController = {
    ...update,
    ...getAll
}
module.exports = horarioController