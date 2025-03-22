const { StatusCodes } = require("http-status-codes");
const knex = require("../../database");
const selecionandoBarbeiro = async (id, ClienteId) => {
  try {
    const BarbeiroExisting = await knex("barbeiros")
      .select("nomeBarbeiro")
      .where({ id })
      .first();
    if (!BarbeiroExisting) {
      return { message: "barbeiro não existe", status: StatusCodes.NOT_FOUND };
    }

    const idCliente = await knex("cliente")
      .select("id")
      .where({ user_id: ClienteId })
      .first();
    if (!idCliente) {
      return { message: "cliente não existe", status: StatusCodes.NOT_FOUND };
    }

    const idDoCliente = idCliente.id;
    const InsertBarberInCliente = await knex("cliente")
      .where({ id: idDoCliente })
      .update({ barbeiro_Id: id });

    if (InsertBarberInCliente) {
        const clinteAtualizado = await knex("cliente")
        .where("id", idDoCliente)
        .select("barbeiro_Id")
        .first()
      return {
        message: "Barbeiro atribuído ao cliente com sucesso",
        status: StatusCodes.OK,
        barbeiroId: clinteAtualizado.barbeiro_Id,
      };
    }
  } catch (err) {
    console.error("Erro ao selecionar barbeiro ", err);
    return {
      message: "Erro interno no servidor",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};
module.exports = { selecionandoBarbeiro };
