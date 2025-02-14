const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {validation} = require('../../shared/middlewares/validation');
const {deleteCliente} = require('../../database/bancoDeDados/providers/cliente/deleteCliente')
const esquemavalidation = yup.object().shape({
    id: yup
        .number()
        .integer()
        .required()
        .moreThan(0)
})
const deleteClienteSchemasResultados = async (req,res)=>{
    try{
        const {id} = req.params
        //banco
        const deletandoCliente = await deleteCliente(id)
        return res.status(deletandoCliente.status).json({
            message:deletandoCliente.message
        })
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:'erro inesperado',
            detalhes:err.message
        })
    }
}
const getSchemas = ()=>{
    return {
        params:esquemavalidation
    }
}
const deleteClienteValidation = validation(getSchemas)
module.exports = {deleteClienteValidation,deleteClienteSchemasResultados}