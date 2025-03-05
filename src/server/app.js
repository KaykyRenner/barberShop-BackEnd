require('./shared/services/traducoesYup')
require('dotenv').config();
const express= require('express'); 
const cors = require('cors'); 
const bodyParser= require('body-parser'); 
const router = require('./routes/router'); 
const jtw = require('jsonwebtoken') 
const app = express();
app.use(cors({
    origin: process.env.CORS
}))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(router); 


  
module.exports = app;
