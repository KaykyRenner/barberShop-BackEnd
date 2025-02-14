const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {validation} = require('../../shared/middlewares/validation');
const {createUsuario} = require('../../database/bancoDeDados/providers/usuarios/createUsu')
const esquemavalidation = yup.object().shape({
    senha: yup
        .string()
        .required()
        .min(7),
    email: yup
        .string()
        .email()
        .required()
        .min(6), // Keeping your original email min length
    role: yup
    .string()
    .oneOf(['cliente','barbeiro'])
    .required()
})
const singUpResultados = async (req,res) =>{
    try{
        const {senha,email,role} = req.body
        const createUsu = await createUsuario(senha,email,role)
        return  res.status(createUsu.status).json({
            message:createUsu.message,
            resultado:createUsu.usuario
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
        body:esquemavalidation
    }
}
const singUpValidation = validation(getSchemas)
module.exports = {singUpValidation,singUpResultados}