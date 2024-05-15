const InterestedPerson = require('../../models/interestedPersonModel');

async function registerInterest(req, res) {
    try {
        const { name, lastName, email, phone, country, city, howFoundUs, interestedAsHost } = req.body;

        if (!name || !lastName || !email || !country || !city || interestedAsHost === undefined) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const newInterest = new InterestedPerson({
            name,
            lastName,
            email,
            phone,
            country,
            city,
            howFoundUs,
            interestedAsHost
        });

        await newInterest.save();
        res.status(201).json({ message: 'Interest registered successfully', data: newInterest });
    } catch (error) {
        console.error('Failed to register interest:', error);
        res.status(500).json({ error: 'An error occurred during the registration process' });
    }
}

module.exports = registerInterest;

