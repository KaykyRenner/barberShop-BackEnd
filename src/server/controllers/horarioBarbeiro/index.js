const update = require('./AtualizarhorariosPadrao')
const getAll = require('./getAllHorarioBarbeiro')
const create = require('./criarHorarioBarbeiro')
const getById = require('./getByIdHorariosCliente')
//const del = require('./deleteCliente')
const horarioController = {
    ...update,
    ...getAll,
    ...create,
    ...getById
}
module.exports = horarioController