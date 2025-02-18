const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {validation} = require('../../shared/middlewares/validation')
const {deleteBarbeiro} = require('../../database/bancoDeDados/providers/barbeiro/deleteBarbeiro')
const esquemavalidation = yup.object().shape({
    id: yup
    .number()
    .integer()
    .required()
    .moreThan(0)
})

const deleteSchemasResultados = async (req,res) =>{
    try{
        const {id} = req.params
        const {role} = req.body

        //delete barbeiro
        const resultado = await deleteBarbeiro(id,role)
        return res.status(resultado.status).json({message:resultado.message})
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
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
const deleteSchemasValidation = validation(getSchemas)
module.exports = {deleteSchemasValidation,deleteSchemasResultados}