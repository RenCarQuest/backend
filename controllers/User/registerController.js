const bcrypt = require('bcryptjs');
const UserModel = require('../../models/userModel');

const forbiddenPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123', 'password1', 'admin', 'welcome'
];

function isPasswordComplex(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const requirements = [
        { test: password.length >= minLength, message: 'Debe tener al menos 8 caracteres.' },
        { test: hasUpperCase, message: 'Debe incluir al menos una letra mayúscula.' },
        { test: hasLowerCase, message: 'Debe incluir al menos una letra minúscula.' },
        { test: hasNumbers, message: 'Debe incluir al menos un número.' },
        { test: hasSpecialChar, message: 'Debe incluir al menos un carácter especial.' }
    ];

    const failedRequirements = requirements.filter(req => !req.test).map(req => req.message);

    return {
        isValid: failedRequirements.length === 0,
        errors: failedRequirements
    };
}

async function registerUser(req, res) {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;

        // Verificar que todos los campos estén presentes y no sean nulos
        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res.status(400).json({ error: 'Faltan datos en el cuerpo de la solicitud' });
        }

        // Verificar si la contraseña cumple con los requisitos de complejidad
        const passwordCheck = isPasswordComplex(password);
        if (!passwordCheck.isValid) {
            return res.status(400).json({ error: 'La contraseña no cumple con los requisitos de complejidad', details: passwordCheck.errors });
        }

        // Verificar si la contraseña está en la lista de contraseñas prohibidas
        if (forbiddenPasswords.includes(password)) {
            return res.status(400).json({ error: 'La contraseña es demasiado común o fácil de adivinar' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber
        });

        // Agregar la nueva contraseña al historial
        await newUser.addPasswordToHistory();

        await newUser.save();

        res.status(201).json({ userId: newUser._id, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }
}

module.exports = registerUser;
