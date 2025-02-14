const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {validation} = require('../../shared/middlewares/validation');
const {updateCliente} = require('../../database/bancoDeDados/providers/cliente/updateCliente')
const esquemavalidation = yup.object().shape({  
    id:yup
        .number()
        .required('O ID é obrigatório.')
        .integer()
        .moreThan(0),
    nomeCliente: yup
        .string()
        .required()
        .min(3)
        .max(100),
    emailCliente:yup
        .string()
        .min(1)
        .max(80)
        .email(),
    telefoneCliente:yup
        .string()
        .matches(
                /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,3}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/,
                'Telefone inválido. Use um formato válido.'
            )
})
const updateClienteSchemasResultados= async (req,res)=>{
    try{
        const {id} = req.params
        const {nomeCliente,emailCliente,telefoneCliente} = req.body
        const atualizandoCliente = await updateCliente(id,nomeCliente,emailCliente,telefoneCliente)
        //banco
        return res.status(atualizandoCliente.status).json({
            massage:atualizandoCliente.message,
            cliete:atualizandoCliente.cliente
        })
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:'erro inesperado',
            detalhes:err.message
        })
    }
}
const getSchemas = () =>{
    return {
        body:esquemavalidation.pick(['emailCliente','nomeCliente','telefoneCliente']),
        params:esquemavalidation.pick(['id'])

    }
}
const updateClienteSchemasValidation = validation(getSchemas)
module.exports = {updateClienteSchemasValidation,updateClienteSchemasResultados}