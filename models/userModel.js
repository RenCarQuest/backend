const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    contraseña: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
