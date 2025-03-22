const { StatusCodes } = require("http-status-codes");
const knex = require("../../database");
const getByIdHorarioDoIdCliente = async (id) => {
  try {
    const result = await knex("horarioBarbeiro").where("cliente_id", id).first();
    if (!result) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: "nenhum horario reservado",
      };
    }
    return {
      message: "horario encontrado",
      status: StatusCodes.OK,
      data: result
    };
  } catch (err) {
    console.error('Erro ao buscar horario:', err);
        return {
            message: 'Erro interno no servidor',
            status: StatusCodes.INTERNAL_SERVER_ERROR
        }; 
  }
};
module.exports = { getByIdHorarioDoIdCliente };
