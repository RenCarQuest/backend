const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/userModel');

async function loginUser(req, res) {
    const { correoElectronico, contraseña } = req.body;

    try {
        const usuario = await UserModel.findOne({ correoElectronico });

        if (!usuario) {
            return res.status(404).json({ error: 'Credenciales incorrectas' });
        }

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ userId: usuario._id }, 'tu_secreto_secreto', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
    }
}

module.exports = {
    loginUser
};
