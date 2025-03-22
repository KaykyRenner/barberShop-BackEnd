const { StatusCodes } = require("http-status-codes");
const yup = require("yup");

const {
  getByIdHorarioDoIdCliente,
} = require("../../database/bancoDeDados/providers/horarioBarbeiro/getByIdHorarioCliente");

const { validation } = require("../../shared/middlewares/validation");
const esquemavalidation = yup.object().shape({
  id: yup.number().required("O ID é obrigatório.").integer().moreThan(0),
});
const getByIdHorariosResultado = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getByIdHorarioDoIdCliente(id);
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  } catch (err) {
    console.log("erro o buscar horario", err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "erro inesperado",
      detalhes: err.message,
    });
  }
};
const getSchemas = () => {
  return {
    params: esquemavalidation,
  };
};
const getByIdHorariosValidation = validation(getSchemas);
module.exports = { getByIdHorariosResultado, getByIdHorariosValidation };
