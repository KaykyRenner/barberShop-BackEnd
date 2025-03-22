const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {validation} = require('../../shared/middlewares/validation');
const {count} = require('../../database/bancoDeDados/providers/barbeiro/count')
const {getAllBarbeiros} = require('../../database/bancoDeDados/providers/barbeiro/getAllBarbeiros')
const esquemavalidation = yup.object().shape({
    page:yup.number().notRequired().min(1).integer(),
    limit: yup.number().notRequired().min(1).integer(),
    filter:yup.string().notRequired().trim().min(0).max(255)
});
const getAllSchemasResultados = async (req,res) =>{
    res.setHeader('access-control-expose-headers', 'x-total-count');
    try{
        const {page = 1,limit = 10,filter = ''} = req.query
        const getAll = await getAllBarbeiros(page,limit,filter)

        const totalCount = await count(filter); 
        
        res.setHeader('x-total-count', totalCount);
        return res.status(getAll.status).json({
            message:getAll.message,
            data:getAll.data
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
const getAllSchmasValidation = validation(getSchemas)
module.exports = {getAllSchmasValidation,getAllSchemasResultados}