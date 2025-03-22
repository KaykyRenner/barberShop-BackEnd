const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {selecionandoBarbeiro} = require('../../database/bancoDeDados/providers/agendamento/selecionarBarbeiro')
const {validation} = require('../../shared/middlewares/validation');
const esquemaValidation = yup.object().shape({
    id: yup
        .number()
        .required('O ID é obrigatório.')
        .integer()
        .moreThan(0)
})
const selecionaBarbeiroResultado = async (req,res) => {
    try{
        const {usuario_id} = req.body
        console.log(usuario_id)
        const {id} = req.params
        const resultado = await selecionandoBarbeiro(id,usuario_id)
        return res.status( resultado.status).json({
            message:resultado.message,
            barbeiroId:resultado.barbeiroId

        })
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:'erro inesperado',
            detalhes: err.message
        })
    }
}
const getSchemas = ()=>{
    return {
        params:esquemaValidation
    }
}
const selecionaBarbeiroValidation = validation(getSchemas)
module.exports = {selecionaBarbeiroValidation,selecionaBarbeiroResultado}
