const bcrypt = require('bcryptjs');
const UserModel = require('../../models/userModel');

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        console.log('------------------------------', req.body)

        // Verificar que todos los campos estén presentes y no sean nulos
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Faltan datos en el cuerpo de la solicitud' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ userId: newUser._id, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }
}

module.exports = registerUser;
