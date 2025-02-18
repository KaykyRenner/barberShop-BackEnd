const {getByEmail} = require('../../database/bancoDeDados/providers/usuarios/getByEmail')
const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {validation} = require('../../shared/middlewares/validation');
const {verifyPassowrd} = require('../../shared/services/passowrdHash')
const {sing} = require('../../shared/services/JWT')
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
    })
const singInResultados = async (req,res) => {
    try{
        const {senha,email}= req.body
        const resultEmail = await getByEmail(email)
        if(!resultEmail){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                default: 'email ou senha está incorreto'
            });
        }
        const verificandoSenha = await verifyPassowrd(senha,resultEmail.usuario.senha)
        if(!verificandoSenha){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                default: 'email ou senha está incorreto'
            }); 
        }
        const id = resultEmail.usuario.id
        const role = resultEmail.usuario.role
        const token = sing(id,role)

        return res.status(resultEmail.status).json({
            message:resultEmail.message,
            usuario:resultEmail.usuario,
            acessToken: token,
            
        })
    }catch(err){
        console.log('erro ao fazer login', err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'erro ao logar',
            message: err.message
        });
    }
}
const getSchemas = ()=>{
    return {
        body:esquemavalidation
    }
}
const singInValidation = validation(getSchemas)
module.exports = {singInValidation,singInResultados}