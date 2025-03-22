const { StatusCodes } = require("http-status-codes");
const yup = require("yup");
const { validation } = require("../../shared/middlewares/validation");
const {
  getAllHorario,
} = require("../../database/bancoDeDados/providers/horarioBarbeiro/getAllHorariosBarbeiro");
const {
  count,
} = require("../../database/bancoDeDados/providers/horarioBarbeiro/count");
const esquemavalidation = yup.object().shape({
  page: yup.number().notRequired().min(1).integer(),
  limit: yup.number().notRequired().min(1).integer(),
  filter: yup.string().notRequired().trim().min(0).max(255),
  id: yup.number().required("O ID é obrigatório.").integer().moreThan(0),
});
const getAllHorariosResultados = async (req, res) => {
  res.setHeader("access-control-expose-headers", "x-total-count");
  try {
    const { role, usuario_id } = req.body;
    const { page = 1, limit = 10, filter = "" } = req.query;
    const { id } = req.params;
    const pegandoHorarios = await getAllHorario(
      role,
      usuario_id,
      id,
      page,
      limit,
      filter
    );

    const totalCount = await count(filter, id);

    res.setHeader("x-total-count", totalCount);

    return res.status(pegandoHorarios.status).json({
      horarios: pegandoHorarios.horarios,
      message: pegandoHorarios.message,
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
    query: esquemavalidation.pick(["page", "limit", "filter"]),
    params: esquemavalidation.pick(["id"]),
  };
};
const getAllSchemaValidation = validation(getSchemas);
module.exports = { getAllSchemaValidation, getAllHorariosResultados };
