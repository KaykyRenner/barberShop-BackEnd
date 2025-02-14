const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {validation} = require('../../shared/middlewares/validation');
const {getAllCliente} = require('../../database/bancoDeDados/providers/cliente/getAllCliente')
const {count} = require('../../database/bancoDeDados/providers/cliente/count')
const esquemavalidation = yup.object().shape({  
    page:yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    filter:yup.string().notRequired().trim().min(3).max(255)
})
const getAllSchemasResultados = async (req,res) =>{
    res.setHeader('access-control-expose-headers', 'x-total-count');
    try{
        const {page = 1,limit = 10,filter = ''} = req.query
        const pegandoClientes = await getAllCliente(page,limit,filter)
        // banco
        const totalCount = await count(filter)// Número total de itens (exemplo)
        // Configuração do cabeçalho para a contagem total
        res.setHeader('x-total-count', totalCount);
        return res.status(pegandoClientes.status).json({
            message:pegandoClientes.message,
            resultado:pegandoClientes.cliente
                })
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'erro inesperado',
            datalhes: err.message
        })
    }
}
const getSchemas = ()=>{
    return {
        query:esquemavalidation
    }
}
const getAllSchemasValidation = validation(getSchemas)
module.exports = {getAllSchemasValidation,getAllSchemasResultados}