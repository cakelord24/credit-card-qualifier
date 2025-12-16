import { MongoClient } from 'mongodb';
import bcryptjs from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient = null;

async function connectDB() {
    if (cachedClient) {
        return cachedClient;
    }

    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        cachedClient = client;
        return client;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

async function hashPassword(password) {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}

async function verifyPassword(inputPassword, hashedPassword) {
    return await bcryptjs.compare(inputPassword, hashedPassword);
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const client = await connectDB();
        const db = client.db('credit_card_db');

        const pathname = req.url.split('?')[0];

        if (pathname === '/api/signup' && req.method === 'POST') {
            const { email, password, firstName, lastName, dateOfBirth, annualIncome, creditScore } = req.body;

            const usersCollection = db.collection('users');
            const existingUser = await usersCollection.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashedPassword = await hashPassword(password);

            const newUser = {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                dateOfBirth,
                annualIncome: parseInt(annualIncome),
                creditScore: parseInt(creditScore),
                createdAt: new Date().toISOString()
            };

            const result = await usersCollection.insertOne(newUser);

            return res.status(201).json({
                id: result.insertedId.toString(),
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                creditScore: newUser.creditScore,
                annualIncome: newUser.annualIncome
            });
        }

        if (pathname === '/api/login' && req.method === 'POST') {
            const { email, password } = req.body;

            const usersCollection = db.collection('users');
            const user = await usersCollection.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const isPasswordValid = await verifyPassword(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            return res.status(200).json({
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                creditScore: user.creditScore,
                annualIncome: user.annualIncome
            });
        }

        if (pathname === '/api/apply' && req.method === 'POST') {
            const { userId, cardId, approvalOdds, status } = req.body;

            const applicationsCollection = db.collection('applications');

            const newApplication = {
                userId,
                cardId,
                approvalOdds,
                status,
                date: new Date().toISOString()
            };

            const result = await applicationsCollection.insertOne(newApplication);

            return res.status(201).json({
                id: result.insertedId.toString(),
                ...newApplication
            });
        }

        if (pathname.startsWith('/api/applications/') && req.method === 'GET') {
            const userId = pathname.split('/').pop();

            const applicationsCollection = db.collection('applications');
            const applications = await applicationsCollection.find({ userId }).toArray();

            return res.status(200).json(applications);
        }

        if (pathname === '/api/profile/update' && req.method === 'POST') {
            const { userId, annualIncome, creditScore } = req.body;
            const { ObjectId } = await import('mongodb');

            const usersCollection = db.collection('users');
            const result = await usersCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { annualIncome: parseInt(annualIncome), creditScore: parseInt(creditScore) } }
            );

            return res.status(200).json({ success: result.modifiedCount > 0 });
        }

        return res.status(404).json({ error: 'Not found' });
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
}
