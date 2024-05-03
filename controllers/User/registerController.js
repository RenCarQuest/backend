const bcrypt = require('bcryptjs');
const UserModel = require('../../models/userModel');

async function registerUser(req, res) {
    try {
        if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Faltan datos en el cuerpo de la solicitud' });
        }

        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        const newUser = new UserModel({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }
}

module.exports = registerUser;
