const { StatusCodes } = require("http-status-codes");
const yup = require("yup");
const {updateHorario} = require("../../database/bancoDeDados/providers/horarioBarbeiro/updateHorario");
const { validation } = require("../../shared/middlewares/validation");
const esquemavalidation = yup.object().shape({
  horarioAtualizado: yup
    .array()
    .of(
      yup
        .string()
        .matches(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          "O horário de início deve estar no formato HH:mm."
        )
        .required("O horário é obrigatório.")
    )
    .min(1, "Ao menos um horário é necessário.")
    .required("Os horários disponíveis são obrigatórios."),
  id: yup.number().required("O ID é obrigatório.").integer().moreThan(0),
});
const horariosSchemasResultados = async (req, res) => {
  try {
    const { id } = req.params; // extrai o id do horario
    const { horarioAtualizado, role } = req.body;
    //banco
    const resultadoUpdate = await updateHorario(id, horarioAtualizado, role);
    return res.status(resultadoUpdate.status).json({
      horarioAtualizado: resultadoUpdate.horario,
      message: resultadoUpdate.message,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "erro inesperado",
      detalhes: err.message,
    });
  }
};
const getSchemas = () => {
  return {
    body: esquemavalidation.pick(["horarioAtualizado"]),
    params: esquemavalidation.pick(["id"]),
  };
};
const horarioSchemaValidation = validation(getSchemas);
module.exports = { horarioSchemaValidation, horariosSchemasResultados };
