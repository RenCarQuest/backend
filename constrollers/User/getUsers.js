const UserModel = require('../../models/userModel');

async function allUsers(req, res) {
    try {
        const usuarios = await UserModel.find();

        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron usuarios' });
        }

        res.status(200).json({ usuarios });
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los usuarios' });
    }
}

module.exports = {
  allUsers
};
