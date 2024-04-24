const bcrypt = require('bcryptjs')
const UserModel = require('../../models/userModel');

async function registrarUsuario(req, res) {
    try {
        // Verificar si req.body existe y contiene los campos necesarios
        if (!req.body || !req.body.nombre || !req.body.correoElectronico || !req.body.contraseña) {
            console.log('req.body-------------', req.body)
            // console.log('nombre-------------', req.body.nombre)
            // console.log('correoElectronico-------------', req.body.correoElectronico)
            // console.log('contraseña-------------', req.body.contraseña)
            return res.status(400).json({ error: 'Faltan datos en el cuerpo de la solicitud' });
        }

        // Extraer datos del cuerpo de la solicitud
        const { nombre, correoElectronico, contraseña } = req.body;

        const usuarioExistente = await UserModel.findOne({ correoElectronico });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        const nuevoUsuario = new UserModel({
            nombre,
            correoElectronico,
            contraseña
        });

        const salt = await bcrypt.genSalt(10);
        nuevoUsuario.contraseña = await bcrypt.hash(contraseña, salt);

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }
}

module.exports = {
    registrarUsuario
};
