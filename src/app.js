import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import {engine} from 'express-handlebars';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js';
import conectarDB from './conexionDB.js'; 
import viewsRoutes from './routes/viewsRoutes.js';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import session from 'express-session'
import { inicializaPassport } from './config/passport.config.js';
import passport from 'passport';
import ConnectMongo from 'connect-mongo'
import { router as sessionsRouter } from './routes/sessions.router.js';

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


const app = express();

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

// Configuración de la base de datos
import { config } from "../src/config/dotenv.js";

console.log(config.PORT)
console.log(config)

inicializaPassport()
app.use(passport.initialize())
app.use(passport.session())

// Rutas
app.use('/products', productsRoutes);
app.use('/sessions', sessionsRouter);
app.use('/carts', cartsRoutes);
app.use('/', viewsRoutes);

app.get('/carts', (req, res) => {
  res.render('carts'); 
});




// Puerto de escucha
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Conexión a la base de datos MongoDB
conectarDB();


