const CronJob = require("cron").CronJob;
const express = require("express");
const {
  resetaHorarioDiarios,
} = require("../../database/bancoDeDados/providers/horarioBarbeiro/resetaHorario");
const cron = new CronJob(
    "* * * * * *",  // Executa todos os dias às 14:12
    async function(){
      console.log("executando o reset horario...");
      await resetaHorarioDiarios();
    },
    null,
    true, // Start immediately
    'America/Los_Angeles' // TimeZone
  );
  
  cron.start();