const knex = require("../../database");

const resetaHorarioDiarios = async () => {
  try {
    const hoje = new Date().toISOString().slice(0, 10);

    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    const ontemData = ontem.toISOString().slice(0, 10);

    console.log(ontemData);
    await knex("horarioBarbeiro")
      .update({
        data: hoje,
        status: "disponível",
        cliente_id: null,
      })
      .where("data", ontemData);
    console.log("horarios resetados com sucesso");
  } catch (err) {
    console.log("erro ao resetar horarios", err);
  }
};
module.exports = { resetaHorarioDiarios };
