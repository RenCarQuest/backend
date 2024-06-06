require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/userModel');

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Credenciales incorrectas' });
        }

        // Verificar si la cuenta está bloqueada
        if (user.isLocked && user.lockUntil > Date.now()) {
            return res.status(403).json({ error: 'La cuenta está temporalmente bloqueada debido a múltiples intentos fallidos. Inténtalo más tarde.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            await user.incrementFailedLoginAttempts();
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Restablecer los intentos fallidos después de un inicio de sesión exitoso
        await user.resetFailedLoginAttempts();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
    }
}

module.exports = loginUser;
