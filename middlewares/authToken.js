const jwt = require('jsonwebtoken');
const BlacklistTokenModel = require('../models/blackListTokenModel');

async function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, sesión no válida: token no proporcionado' });
    }

    try {
        const blacklisted = await BlacklistTokenModel.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ error: 'Acceso denegado, sesión no válida: token en lista negra' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error al verificar token:', err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Acceso denegado, sesión no válida: token expirado' });
        }
        res.status(401).json({ error: 'Acceso denegado, sesión no válida: token no válido' });
    }
}

module.exports = authenticateToken;
