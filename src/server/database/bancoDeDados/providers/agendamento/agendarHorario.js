const { StatusCodes } = require("http-status-codes");
const knex = require("../../database");
const reservarHorario = async (reservar, idHorario, role, user_id) => {
  try {
    if (role !== "cliente") {
      return {
        message: "você não tem permissão",
        status: StatusCodes.FORBIDDEN,
      };
    }
    const cliente = await knex("cliente")
      .select("id", "barbeiro_id")
      .where({ user_id })
      .first();
    if (!cliente) {
      return {
        message: "Cliente não encontrado.",
        status: StatusCodes.NOT_FOUND,
      };
    }
    const { id: clienteId, barbeiro_id: BarberCliente } = cliente;

    if (BarberCliente == null) {
      return {
        message:
          "Você precisa escolher um barbeiro antes de agendar um horário.",
        status: StatusCodes.BAD_REQUEST,
      };
    }

    if (!idHorario) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: "O ID do horário é obrigatório.",
      };
    }

    const horarioExist = await knex("horarioBarbeiro")
      .select("id", "status", "barbeiro_id", "cliente_id")
      .where({ id: idHorario })
      .first();

    if (horarioExist.barbeiro_id !== BarberCliente) {
      return {
        message: "o horario deve ser o memso do seu barbeiro",
        status: StatusCodes.CONFLICT,
      };
    }

    if (!horarioExist || horarioExist.status === "reservado") {
      return {
        message: "horario não encontrado ou reservado",
        status: StatusCodes.NOT_FOUND,
      };
    }
    const horariosJaReservado = await knex("horarioBarbeiro")
      .select("id", "cliente_id")
      .where({ cliente_id: clienteId })
      .first()

    if (horariosJaReservado) {
      return {
        message: "voce só pode reservar um horario por vez",
        status: StatusCodes.BAD_REQUEST,
      };
    }
    const resultado = await knex("horarioBarbeiro")
      .where({ id: idHorario })
      .update({ status: reservar, cliente_id: clienteId });

    if (resultado) {
      return {
        status: StatusCodes.OK,
        message: "horario reservado com sucesso",
        horarioReservado: { horario: horarioExist.horario },
      };
    } else {
      return {
        message: "não foi possível reservar horario",
        status: StatusCodes.BAD_REQUEST,
      };
    }
  } catch (err) {
    console.error("Erro ao agendar horario ", err);
    return {
      message: "Erro interno no servidor",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};
module.exports = { reservarHorario };
