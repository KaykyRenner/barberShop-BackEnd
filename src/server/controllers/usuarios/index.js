const singUp = require('./singUp')
const singIn = require('./singIn')
const usuarioController = {
    ...singIn,
    ...singUp,
}
module.exports = usuarioController