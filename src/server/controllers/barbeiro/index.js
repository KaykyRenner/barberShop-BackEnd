const create = require('./createBarbeiro')
const del = require('./deleteBarbeiro')
const update = require('./updateBarbeiro')
const get = require('./getByIdBarbeiro')
const getAll = require('./getAllBarbeiro')
const barbeiroController = {
    ...create,
    ...del,
    ...update,
    ...get,
    ...getAll
}
module.exports = barbeiroController