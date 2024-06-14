const InterestedPerson = require('../../models/interestedPersonModel');
const errorCodes = require('../../Config/errorCodes');

async function registerInterest(req, res) {
    try {
        console.log('Datos recibidos en el servidor:', req.body);

        const { name, email, phone } = req.body;

        if (!name) {
            return res.status(400).json({ error: errorCodes.MISSING_NAME.message, code: errorCodes.MISSING_NAME.code });
        }

        if (!email) {
            return res.status(400).json({ error: errorCodes.MISSING_EMAIL.message, code: errorCodes.MISSING_EMAIL.code });
        }

        if (!phone) {
            return res.status(400).json({ error: errorCodes.MISSING_PHONE.message, code: errorCodes.MISSING_PHONE.code });
        }

        // Validaciones adicionales
        if (name.length > 40) {
            return res.status(400).json({ error: 'El nombre es demasiado largo', code: 'VAL008' });
        }

        if (phone.length > 15) {
            return res.status(400).json({ error: 'El número de teléfono es demasiado largo', code: 'VAL010' });
        }

        if (!/^\d+$/.test(phone)) {
            return res.status(400).json({ error: 'El número de teléfono contiene caracteres no permitidos', code: 'VAL011' });
        }

        // Verificar si el correo electrónico ya existe
        const existingPerson = await InterestedPerson.findOne({ email });
        if (existingPerson) {
            return res.status(400).json({ error: errorCodes.DUPLICATE_EMAIL.message, code: errorCodes.DUPLICATE_EMAIL.code });
        }

        const newInterest = new InterestedPerson({
            name,
            email,
            phone
        });

        await newInterest.save();
        res.status(201).json({ message: 'Registro exitoso', data: newInterest });
    } catch (error) {
        console.error('Failed to register interest:', error);
        res.status(500).json({ error: errorCodes.SERVER_ERROR.message, code: errorCodes.SERVER_ERROR.code });
    }
}

module.exports = registerInterest;
