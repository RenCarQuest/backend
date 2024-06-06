require('dotenv').config();
const jwt = require('jsonwebtoken');
const BlacklistTokenModel = require('../../../models/blackListTokenModel');

async function logoutUser(req, res) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(400).json({ error: 'Falta el token en la solicitud' });
        }

        // Verificar el token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.error('Error al verificar el token:', err);
                return res.status(401).json({ error: 'Token no válido' });
            }

            // Verificar si el token ya está en la lista negra
            const tokenExists = await BlacklistTokenModel.findOne({ token });
            if (tokenExists) {
                return res.status(400).json({ error: 'Ya se ha cerrado esta sesión' });
            }

            // Añadir el token a la lista negra
            const blacklistToken = new BlacklistTokenModel({ token });
            await blacklistToken.save();

            res.status(200).json({ message: 'Cierre de sesión exitoso' });
        });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ error: 'Ocurrió un error al cerrar sesión' });
    }
}

module.exports = logoutUser;
