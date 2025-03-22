const express = require('express');
const router = express.Router();
const {authenticate } = require('../shared/middlewares/authenticade')
//facilitando a ultilização de status
const { StatusCodes } = require('http-status-codes');
//importanto as rotas da cidade
const {barbeiroController,clienteController,horarioController, usuarioController,agendamentoControlelr} = require('../controllers/index');

router.get('/', (req,res)=>{
    res.send("barbearia funcionando");
});
//rota da barbeiro
router.post('/barbeiro',authenticate,barbeiroController.createSchemasValidation,barbeiroController.createSchemasResultados)
router.delete('/barbeiro/:id',authenticate,barbeiroController.deleteSchemasValidation,barbeiroController.deleteSchemasResultados)
router.put('/barbeiro/:id',authenticate,barbeiroController.updateSchemasValidation,barbeiroController.updateSchemasResultados)
router.get('/barbeiro/:id',authenticate,barbeiroController.getSchemasValidation, barbeiroController.getSchemasResultados)
router.get('/barbeiro',barbeiroController.getAllSchmasValidation, barbeiroController.getAllSchemasResultados)
//horario do barbeiro
router.get('/barbeiro/horario/:id',authenticate,horarioController.getByIdHorariosValidation,horarioController.getByIdHorariosResultado)
router.post('/barbeiro/horario',authenticate,horarioController.createHorarioValidation,horarioController.createHorarioResultados)
router.put('/barbeiro/horario/:id',authenticate,horarioController.horarioSchemaValidation,horarioController.horariosSchemasResultados)
router.get('/barbeiro/:id/horario',authenticate,horarioController.getAllSchemaValidation,horarioController.getAllHorariosResultados)
//seleciona barbeiro para Cliente agendar horario
router.put('/cliente/barbeiro/:id',authenticate,agendamentoControlelr.selecionaBarbeiroValidation,agendamentoControlelr.selecionaBarbeiroResultado)
//agendar Horario
router.put('/cliente/agendamento/:id',authenticate,agendamentoControlelr.agendaHorarioValidation,agendamentoControlelr.agendarHorarioResultados)
router.put('/cliemte/cancelarHorario/:id',authenticate,agendamentoControlelr.cancelarHorarioValidation, agendamentoControlelr.cancelarHorarioResultados)
//rota cliente
router.post('/cliente',authenticate, clienteController.CreateSchemasValidation,clienteController.createClienteSchemasResultados)
router.delete('/cliente/:id',authenticate, clienteController.deleteClienteValidation, clienteController.deleteClienteSchemasResultados);
router.put('/cliente/:id',authenticate, clienteController.updateClienteSchemasValidation, clienteController.updateClienteSchemasResultados);
router.get('/cliente/:id',authenticate,clienteController.getClienteSchemasValidation,clienteController.getClienteSchemasResultados)
router.get('/cliente',authenticate,clienteController.getAllSchemasValidation,clienteController.getAllSchemasResultados)
//login
router.post('/cadastrar',usuarioController.singUpValidation,usuarioController.singUpResultados)
router.post('/entrar',usuarioController.singInValidation,usuarioController.singInResultados)

module.exports = router;