const {StatusCodes} = require('http-status-codes')
const yup = require('yup')
const {validation} = require('../../shared/middlewares/validation')
//createCidade
const {createBarbeiro} = require('../../database/bancoDeDados/providers/barbeiro/createBarbeiro')
const {HorarioPadrao} = require('../../database/bancoDeDados/providers/horarioBarbeiro/createHorario')
// Esquema de validação com Yup
const esquemavalidation = yup.object().shape({
    usuario_id: yup
    .number()
    .required()
    .positive()
    .integer()
    ,
    nomeBarbeiro: yup
    .string()
    .required()
    .min(3)
    .max(100),
    emailBarbeiro:yup
    .string()
    .required()
    .min(1)
    .max(80)
    .email(),
    telefoneBarbeiro:yup
    .string()
    .required()
    .matches(
        /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,3}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/,
        'Telefone inválido. Use um formato válido.'
    ),
})

// Função para criar a cidade
const createSchemasResultados = async (req,res)=>{
    try{
        //testando extrção de id pelo JTW 
        console.log('usuario autenticado', )
        // Extrai o nome da cidade do corpo da requisição
        const {nomeBarbeiro,emailBarbeiro,telefoneBarbeiro,usuario_id} = req.body
        // Cria a barbeiro no banco de dados
        const novoBarbeiro = await createBarbeiro(nomeBarbeiro,emailBarbeiro,telefoneBarbeiro,usuario_id)
        //horarioPadrao
        const horariosPadrao = ["08:00","09:00", "10:00", "11:00", "14:00", "15:00","16:00","17:00"];
        for (let horario of horariosPadrao)
            {
                await HorarioPadrao(horario,new Date(),novoBarbeiro.barbeiro.id)
        }// Resposta de sucesso
        return res.status(novoBarbeiro.status).json({
            barbeiro:novoBarbeiro.barbeiro,
            horarioPadrao: horariosPadrao,
            message:novoBarbeiro.message + ' e horario padrão criado'
        })
    }catch(err){
        // Em caso de erro, retorna uma resposta com o erro
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:'erro inesperado',
            detalhes: err.message
        })
    }
}
const getSchemas = ()=>{
    return {
        body:esquemavalidation
    }
}
const createSchemasValidation = validation(getSchemas)

module.exports = {createSchemasValidation, createSchemasResultados}