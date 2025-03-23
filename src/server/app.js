require("./shared/services/traducoesYup");
require("dotenv").config();
const CronJob = require("cron").CronJob;
const {resetaHorarioDiarios} = require("../server/database/bancoDeDados/providers/horarioBarbeiro/resetaHorario");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const jtw = require("jsonwebtoken");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Authorization", "Content-Type"], // Permitir cabeçalhos específicos
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const cron = new CronJob(
  "0 0 * * * ", // Executa todos os dias às 14:12
  async function () {
    console.log("executando o reset horario...");
    await resetaHorarioDiarios();
  },
  null,
  true, // Start immediately
  'America/Sao_Paulo' // TimeZone
);
 

module.exports = app;
