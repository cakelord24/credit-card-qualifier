import { MongoClient } from 'mongodb';
import bcryptjs from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    return client;
}

async function verifyPassword(inputPassword, hashedPassword) {
    return await bcryptjs.compare(inputPassword, hashedPassword);
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const client = await connectDB();
        const db = client.db('credit_card_db');
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email });

        if (!user) {
            await client.close();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
            await client.close();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        await client.close();

        return res.status(200).json({
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            creditScore: user.creditScore,
            annualIncome: user.annualIncome
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Login failed: ' + error.message });
    }
}
