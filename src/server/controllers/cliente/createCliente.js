const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {validation} = require('../../shared/middlewares/validation');
const {createCliente} = require('../../database/bancoDeDados/providers/cliente/createCliente')
const esquemavalidation = yup.object().shape({
    usuario_id: yup
        .number()
        .required()
        .positive()
        .integer()
        ,
    nomeCliente: yup
    .string()
    .required()
    .min(3)
    .max(100),
    emailCliente:yup
    .string()
    .required()
    .min(1)
    .max(80)
    .email(),
    telefoneCliente:yup
    .string()
    .required()
    .matches(
            /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,3}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/,
            'Telefone inválido. Use um formato válido.'
        )
})
const createClienteSchemasResultados = async(req,res)=>{
    try{ 
        const {nomeCliente,emailCliente,telefoneCliente,usuario_id} = req.body
        const newCliente = await createCliente(nomeCliente,emailCliente,telefoneCliente,usuario_id)
        //banco de dados
        return res.status(newCliente.status)
        .json({message:newCliente.message,
            cliente:newCliente.cliente })
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:'erro inesperado',
            detalhes:err.message,
        })
    }
}
const getSchemas = () =>{
    return {
        body: esquemavalidation
    }
}
const CreateSchemasValidation = validation(getSchemas)
module.exports = {CreateSchemasValidation,createClienteSchemasResultados}