const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {validation} = require('../../shared/middlewares/validation');
const {UpdateBarbeiro} = require('../../database/bancoDeDados/providers/barbeiro/updateBarbeiro')
const esquemavalidation = yup.object().shape({
    id: yup
    .number()
    .required('O ID é obrigatório.')
    .integer()
    .moreThan(0),
    nomeBarbeiro: yup
    .string()
    .required()
    .min(3)
    .max(100),
    emailBarbeiro:yup
    .string()
    .min(1)
    .max(80)
    .email(),
    telefoneBarbeiro:yup
    .string()
    .matches(
            /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,3}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/,
            'Telefone inválido. Use um formato válido.'
        )
})

const updateSchemasResultados = async (req,res) =>{
    try{
        const {id} = req.params
        const {nomeBarbeiro,emailBarbeiro,telefoneBarbeiro,role} = req.body
        const newUpdateBarbeiro = await UpdateBarbeiro(id,nomeBarbeiro,emailBarbeiro,telefoneBarbeiro,role)
        //atualizar
        return res.status( newUpdateBarbeiro.status).json({
            message: newUpdateBarbeiro.message,
            barbeiro: newUpdateBarbeiro.barbeiro
        })
    }catch(err){
        
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:'erro inesperado',
            detalhes:err.message
        })
    }
}
const getSchemas = () =>{
    return {
        params: esquemavalidation.pick(['id']),
        body: esquemavalidation.pick(['emailBarbeiro','nomeBarbeiro','telefoneBarbeiro'])
    }
}
const updateSchemasValidation = validation(getSchemas)
module.exports = {updateSchemasValidation, updateSchemasResultados}