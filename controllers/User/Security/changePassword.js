const bcrypt = require('bcryptjs');
const UserModel = require('../../../models/userModel');

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

function arePasswordsTooSimilar(password1, password2) {
    // Una forma simple de medir la similitud es usando la distancia de Levenshtein
    // Aquí usaremos una aproximación simple
    let similarityCount = 0;
    const minLength = Math.min(password1.length, password2.length);

    for (let i = 0; i < minLength; i++) {
        if (password1[i] === password2[i]) {
            similarityCount++;
        }
    }

    const similarityPercentage = (similarityCount / minLength) * 100;
    return similarityPercentage > 70; // Si más del 70% de los caracteres son iguales, se consideran demasiado similares
}

async function changePassword(req, res) {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Verificar que todos los campos estén presentes y no sean nulos
        if (!userId || !oldPassword || !newPassword) {
            return res.status(400).json({ error: 'Faltan datos en el cuerpo de la solicitud' });
        }

        // Verificar si el nuevo password cumple con los requisitos de complejidad
        const passwordCheck = isPasswordComplex(newPassword);
        if (!passwordCheck.isValid) {
            return res.status(400).json({ error: 'La contraseña no cumple con los requisitos de complejidad', details: passwordCheck.errors });
        }

        // Verificar si la nueva contraseña está en la lista de contraseñas prohibidas
        if (forbiddenPasswords.includes(newPassword)) {
            return res.status(400).json({ error: 'La contraseña es demasiado común o fácil de adivinar' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña antigua es correcta
        const validOldPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validOldPassword) {
            return res.status(401).json({ error: 'La contraseña antigua es incorrecta' });
        }

        // Verificar si la nueva contraseña está en el historial
        if (await user.isPasswordInHistory(newPassword)) {
            return res.status(400).json({ error: 'No se puede reutilizar una contraseña reciente' });
        }

        // Verificar si la nueva contraseña es igual o muy similar a la antigua
        if (await bcrypt.compare(newPassword, user.password) || arePasswordsTooSimilar(newPassword, oldPassword)) {
            return res.status(400).json({ error: 'La nueva contraseña no puede ser igual o muy similar a la antigua' });
        }

        // Actualizar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Agregar la contraseña actual al historial antes de actualizarla
        await user.addPasswordToHistory();

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ error: 'Ocurrió un error al cambiar la contraseña' });
    }
}

module.exports = changePassword;
