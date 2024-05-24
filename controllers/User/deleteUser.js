const UserModel = require('../../models/userModel');

async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Falta el ID del usuario en la solicitud' });
        }

        const user = await UserModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario borrado exitosamente' });
    } catch (error) {
        console.error('Error al borrar usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al borrar el usuario' });
    }
}

module.exports = deleteUser;
