const PersonBeta = require('../../models/registerPersonBetaModel');
const errorCodes = require('../../Config/errorCodes');

async function registerPersonBeta(req, res) {
    try {
        console.log('Datos recibidos en el servidor:', req.body);

        const { name, phone, email, city, carBrand, carModel } = req.body;

        if (!name) {
            return res.status(400).json({ error: errorCodes.MISSING_NAME.message, code: errorCodes.MISSING_NAME.code });
        }

        if (!email) {
            return res.status(400).json({ error: errorCodes.MISSING_EMAIL.message, code: errorCodes.MISSING_EMAIL.code });
        }

        if (!phone) {
            return res.status(400).json({ error: errorCodes.MISSING_PHONE.message, code: errorCodes.MISSING_PHONE.code });
        }

        if (!city) {
            return res.status(400).json({ error: errorCodes.MISSING_CITY.message, code: errorCodes.MISSING_CITY.code });
        }

        if (!carBrand) {
            return res.status(400).json({ error: errorCodes.MISSING_CAR_BRAND.message, code: errorCodes.MISSING_CAR_BRAND.code });
        }

        if (!carModel) {
            return res.status(400).json({ error: errorCodes.MISSING_CAR_MODEL.message, code: errorCodes.MISSING_CAR_MODEL.code });
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

        if (city.length > 40) {
            return res.status(400).json({ error: 'El nombre de la ciudad es demasiado largo', code: 'VAL012' });
        }

        if (!/^[a-zA-Z\s]+$/.test(city)) {
            return res.status(400).json({ error: 'El nombre de la ciudad contiene caracteres no permitidos', code: 'VAL013' });
        }

        if (carBrand.length > 40) {
            return res.status(400).json({ error: 'La marca del coche es demasiado larga', code: 'VAL014' });
        }

        if (carModel.length > 40) {
            return res.status(400).json({ error: 'El modelo del coche es demasiado largo', code: 'VAL016' });
        }

        if (!/^[a-zA-Z\s]+$/.test(carModel)) {
            return res.status(400).json({ error: 'El modelo del coche contiene caracteres no permitidos', code: 'VAL017' });
        }

        // Verificar si el correo electrónico ya existe
        const existingPerson = await PersonBeta.findOne({ email });
        if (existingPerson) {
            return res.status(400).json({ error: errorCodes.DUPLICATE_EMAIL.message, code: errorCodes.DUPLICATE_EMAIL.code });
        }

        const newPersonBeta = new PersonBeta({
            name,
            phone,
            email,
            city,
            carBrand,
            carModel
        });

        await newPersonBeta.save();
        res.status(201).json({ message: 'Registro exitoso', data: newPersonBeta });
    } catch (error) {
        console.error('Failed to register person beta:', error);
        res.status(500).json({ error: errorCodes.SERVER_ERROR.message, code: errorCodes.SERVER_ERROR.code });
    }
}

module.exports = registerPersonBeta;
