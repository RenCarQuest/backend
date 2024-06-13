const InterestedPerson = require('../../models/interestedPersonModel');

async function registerInterest(req, res) {
    try {
        const { name, email, phone } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if email already exists
        const existingPerson = await InterestedPerson.findOne({ email });
        if (existingPerson) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const newInterest = new InterestedPerson({
            name,
            email,
            phone
        });

        await newInterest.save();
        res.status(201).json({ message: 'Interest registered successfully', data: newInterest });
    } catch (error) {
        console.error('Failed to register interest:', error);
        res.status(500).json({ error: 'An error occurred during the registration process' });
    }
}

module.exports = registerInterest;
