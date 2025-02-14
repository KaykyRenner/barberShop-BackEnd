const create = require('./createCliente')
const del = require('./deleteCliente')
const update = require('./updateCliente')
const get = require('./getByIdCliente')
const getAll = require('./getAllCliente')
const clienteController = {
    ...create,
    ...del,
   ...update,
   ...get,
   ...getAll
}
module.exports = clienteController