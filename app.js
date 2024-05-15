const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3014;

const uri = 'mongodb+srv://businesscarquest:gV1Pm7iPLFi9AU7h@cluster0.nwkuccm.mongodb.net/';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión establecida con MongoDB Atlas');
    })
    .catch(err => console.error('Error al conectar con MongoDB Atlas:', err));

app.use(morgan('dev'));

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
