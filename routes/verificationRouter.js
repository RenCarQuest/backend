const express = require('express');
const verificationRouter = express.Router();
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// verificationRouter.post('/send-verification', async (req, res) => {
//     const phoneNumber = req.body.phoneNumber;

//     try {
//         const verification = await client.verify.v2.services("VAda2d6e871d244041d5c89a4b8f3f6e2e")
//             .verifications
//             .create({ to: phoneNumber, channel: 'sms' });

//         res.json({ message: 'Código de verificación enviado', sid: verification.sid });
//     } catch (error) {
//         console.error('Error enviando el código de verificación:', error);
//         res.status(500).send('Error enviando el código de verificación');
//     }
// });

verificationRouter.post('/send-verification', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    try {
        const verification = await client.verify.v2.services("VAda2d6e871d244041d5c89a4b8f3f6e2e")
            .verifications
            .create({ to: phoneNumber, channel: 'sms' });

        res.json({ message: 'Código de verificación enviado', sid: verification.sid });
    } catch (error) {
        console.error('Error enviando el código de verificación:', error);
        res.status(500).send('Error enviando el código de verificación');
    }
});

module.exports = verificationRouter;
