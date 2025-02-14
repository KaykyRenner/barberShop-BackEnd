const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {validation} = require('../../shared/middlewares/validation');
const {getById} = require('../../database/bancoDeDados/providers/barbeiro/getByIdBarbeiro')
const esquemavalidation = yup.object().shape({
    id:yup
    .number()
    .integer()
    .required()
    .moreThan(0)
})
const getSchemasResultados = async (req,res)=>{
    try{
        const {id} = req.params
        const pegarPorId = await getById(id)
        return res.status(pegarPorId.status).json({
            message:pegarPorId.message,
            barbeiro: pegarPorId.barbeiro
        })
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:'erro inesperado',
            detalhes: err.message
        })
    }
}
const getSchemas = ()=>{
    return {
        params:esquemavalidation
    }
}
const getSchemasValidation = validation(getSchemas)
module.exports = {getSchemasValidation,getSchemasResultados}