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
router.delete('/barbeiro/:id',barbeiroController.deleteSchemasValidation,barbeiroController.deleteSchemasResultados)
router.put('/barbeiro/:id',barbeiroController.updateSchemasValidation,barbeiroController.updateSchemasResultados)
router.get('/barbeiro/:id',barbeiroController.getSchemasValidation, barbeiroController.getSchemasResultados)
router.get('/barbeiro',barbeiroController.getAllSchmasValidation, barbeiroController.getAllSchemasResultados)
//horario do barbeiro
router.put('/barbeiro/horario/:id',horarioController.horarioSchemaValidation,horarioController.horariosSchemasResultados)
router.get('/barbeiro/:id/horario',horarioController.getAllSchemaValidation,horarioController.getAllHorariosResultados)
//rota cliente
router.post('/cliente', clienteController.CreateSchemasValidation,clienteController.createClienteSchemasResultados)
router.delete('/cliente/:id', clienteController.deleteClienteValidation, clienteController.deleteClienteSchemasResultados);
router.put('/cliente/:id', clienteController.updateClienteSchemasValidation, clienteController.updateClienteSchemasResultados);
router.get('/cliente/:id',clienteController.getClienteSchemasValidation,clienteController.getClienteSchemasResultados)
router.get('/cliente',clienteController.getAllSchemasValidation,clienteController.getAllSchemasResultados)
//login
router.post('/cadastrar',usuarioController.singUpValidation,usuarioController.singUpResultados)
router.post('/entrar',usuarioController.singInValidation,usuarioController.singInResultados)

module.exports = router;