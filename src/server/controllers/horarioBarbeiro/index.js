const update = require('./AtualizarhorariosPadrao')
const getAll = require('./getAllHorarioBarbeiro')
const create = require('./criarHorarioBarbeiro')
//const del = require('./deleteCliente')
const horarioController = {
    ...update,
    ...getAll,
    ...create
}
module.exports = horarioController