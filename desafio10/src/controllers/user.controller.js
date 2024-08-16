import UserRepositoryImpl from '../repositories/user.repository.impl.js';
import crypto from 'crypto';
import { sendResetPasswordEmail } from '../utils/mailer.js';
import User from '../dao/models/user.model.js';
import bcrypt from 'bcryptjs';
import logger from '../utils/logger.js';

const userRepository = new UserRepositoryImpl();

export const toggleUserRole = async (req, res) => {
    try {
        const { uid } = req.params;

        const user = await userRepository.toggleUserRole(uid);

        res.status(200).json({ status: 'success', message: `Rol cambiado a ${user.role}` });
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
    }
};

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn(`Usuario con email ${email} no encontrado.`);
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        logger.debug(`Solicitud de restablecimiento de contraseña para: ${email}`);

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;

        await user.save();

        logger.debug(`Token generado: ${token} para usuario: ${email}`);
        logger.debug(`Token y fecha de expiración guardados para usuario: ${email}`);

        logger.debug(`Generando enlace de restablecimiento: http://localhost:8080/reset-password/${token}`);
        logger.debug(`Enviando correo a ${email} con token ${token}`);
        await sendResetPasswordEmail(user.email, token);

        logger.info(`Correo de restablecimiento enviado a ${email}`);
        res.status(200).json({ message: 'Correo de recuperación enviado.' });
    } catch (error) {
        logger.error('Error al solicitar el restablecimiento de contraseña:', error);
        res.status(500).json({ error: 'Error al solicitar el restablecimiento de contraseña.' });
    }
};


export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    logger.debug(`Token recibido para restablecimiento: ${token}`);

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        logger.debug(`Consulta de usuario con token: ${token}`);
        logger.debug(`Resultado de la consulta: ${user}`);

        if (!user) {
            logger.debug(`El token ${token} es inválido o ha expirado.`);
            return res.status(400).json({ error: 'Token inválido o expirado.' });
        }

        const isSamePassword = await bcrypt.compare(password, user.password);
        if (isSamePassword) {
            return res.status(400).json({ error: 'No puedes utilizar la misma contraseña.' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Contraseña restablecida exitosamente.' });
    } catch (error) {
        logger.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ error: 'Error al restablecer la contraseña.' });
    }
};
