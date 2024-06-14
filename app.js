require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');  // Importa el paquete cors
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3014;

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión establecida con MongoDB Atlas');
    })
    .catch(err => console.error('Error al conectar con MongoDB Atlas:', err));

app.use(morgan('dev'));

// Configura el middleware CORS para permitir cualquier origen
app.use(cors({
    origin: '*',  // Permite cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization']  // Encabezados permitidos
}));

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
