const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {cancelarHorario} = require('../../database/bancoDeDados/providers/agendamento/cancelarHorario')
const {validation} = require('../../shared/middlewares/validation');
const esquemaValidation = yup.object().shape({
    cancelar: yup.string()
        .oneOf(['disponível'])
        .required(),
    id: yup
        .number()
        .required('O ID é obrigatório.')
        .integer()
        .moreThan(0)
})
const cancelarHorarioResultados = async (req,res) => {
    try{
        const {cancelar,usuario_id,role} = req.body
        const {id} = req.params
        const resultado = await cancelarHorario(cancelar,id,role,usuario_id)
        if(!resultado){
            return req.status(StatusCodes.BAD_REQUEST).json({
                message:'não foi possível cancelar horario'
            })
        }
        return res.status(resultado.status).json({
            message:resultado.message,
            cancelamento:resultado.horarioReservado
        }
        )

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
            message:'erro inesperado',
            detalhes:err.message
            }
        )
    }
}
const getSchemas = ()=>{
    return{
        body:esquemaValidation.pick(['cancelar']),
        params:esquemaValidation.pick(['id'])
    }
}
const cancelarHorarioValidation = validation(getSchemas)
module.exports = {cancelarHorarioValidation,cancelarHorarioResultados}