const { StatusCodes } = require("http-status-codes");
const yup = require("yup");
const {
  criatHorario,
} = require("../../database/bancoDeDados/providers/horarioBarbeiro/createHorario");
const { validation } = require("../../shared/middlewares/validation");
const knex = require("../../database/bancoDeDados/database");
const esquemaValidation = yup.object().shape({
  horario: yup
    .array()
    .of(
      yup
        .string()
        .matches(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          "O horário de início deve estar no formato HH:mm."
        )
        .required()
    )
    .min(1, "Ao menos um horário é necessário.")
    .required(),
});
const createHorarioResultados = async (req, res) => {
  try {
    const { horario, usuario_id, role } = req.body;
    const pegandoId = await knex("barbeiros")
      .select("id")
      .where("user_id", usuario_id)
      .first();
    if (!pegandoId)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Barbeiro não encontrado." });
    const { id: barbeiroId } = pegandoId;
    const resultado = await criatHorario(horario, new Date(), barbeiroId, role);
    return res.status(resultado.status).json({
      message: resultado.message,
      horario: resultado.horario,
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
    body: esquemaValidation,
  };
};
const createHorarioValidation = validation(getSchemas);
module.exports = { createHorarioValidation, createHorarioResultados };
