const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
const {reservarHorario} = require('../../database/bancoDeDados/providers/agendamento/agendarHorario')
const {validation} = require('../../shared/middlewares/validation');
const esquemaValidation = yup.object().shape({
    reservar: yup.string()
    .oneOf(['reservado'])
    .required(),
    id: yup
            .number()
            .required('O ID é obrigatório.')
            .integer()
            .moreThan(0)
})
const agendarHorarioResultados = async (req,res) => {
    try{
        const {id} = req.params
        const {reservar,role,usuario_id} = req.body;
        console.log(usuario_id)
        const agendamento = await reservarHorario(reservar,id,role,usuario_id)
        return res.status(agendamento.status).json({
            message: agendamento.message,
            dados: agendamento.horarioReservado || null
        })
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
        body:esquemaValidation
    }
}
const agendaHorarioValidation = validation(getSchemas)
module.exports = {agendaHorarioValidation,agendarHorarioResultados}