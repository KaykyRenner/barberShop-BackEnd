const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {validation} = require('../../shared/middlewares/validation');
const {getByIdCliente} = require('../../database/bancoDeDados/providers/cliente/getByIdCliente')
const esquemavalidation = yup.object().shape({  
     id: yup
            .number()
            .integer()
            .required()
            .moreThan(0)
})
const getClienteSchemasResultados = async (req,res)=>{
    try{
        const {id} = req.params
        //banco
        const pegandoId =await getByIdCliente(id)
        return res.status(pegandoId.status).json({
            message:pegandoId.message,
            usuario: pegandoId.cliente
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
const getClienteSchemasValidation = validation(getSchemas)
module.exports = {getClienteSchemasValidation,getClienteSchemasResultados}