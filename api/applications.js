import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    return client;
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: 'userId required' });
        }

        const client = await connectDB();
        const db = client.db('credit_card_db');
        const applicationsCollection = db.collection('applications');

        const applications = await applicationsCollection.find({ userId }).toArray();
        await client.close();

        return res.status(200).json(applications);
    } catch (error) {
        console.error('Fetch applications error:', error);
        return res.status(500).json({ error: 'Failed to fetch applications: ' + error.message });
    }
}
