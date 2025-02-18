const express = require('express');
const router = express.Router();
const {authenticate} = require('../shared/middlewares/authenticade')
//facilitando a ultilização de status
const {StatusCode} = require('http-status-codes');
//importanto as rotas da cidade
const {barbeiroController,clienteController,horarioController, usuarioController} = require('../controllers/index');

router.get('/', (req,res)=>{
    res.send("barbearia funcionando");
});
//rota da barberaria
router.post('/barbeiro',authenticate,barbeiroController.createSchemasValidation,barbeiroController.createSchemasResultados)
router.delete('/barbeiro/:id',authenticate,barbeiroController.deleteSchemasValidation,barbeiroController.deleteSchemasResultados)
router.put('/barbeiro/:id',authenticate,barbeiroController.updateSchemasValidation,barbeiroController.updateSchemasResultados)
router.get('/barbeiro/:id',authenticate,barbeiroController.getSchemasValidation, barbeiroController.getSchemasResultados)
router.get('/barbeiro',authenticate,barbeiroController.getAllSchmasValidation, barbeiroController.getAllSchemasResultados)
//horario do barbeiro
router.put('/barbeiro/horario/:id',authenticate,horarioController.horarioSchemaValidation,horarioController.horariosSchemasResultados)
router.get('/barbeiros/:id/horarios',authenticate,horarioController.getAllSchemaValidation,horarioController.getAllHorariosResultados)
//agendar Horario
router.put('/cliente/agendamento/:id')
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