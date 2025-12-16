import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    return client;
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
        const { userId, cardId, approvalOdds, status } = req.body;

        const client = await connectDB();
        const db = client.db('credit_card_db');
        const applicationsCollection = db.collection('applications');

        const newApplication = {
            userId,
            cardId,
            approvalOdds,
            status,
            date: new Date().toISOString()
        };

        const result = await applicationsCollection.insertOne(newApplication);
        await client.close();

        return res.status(201).json({
            id: result.insertedId.toString(),
            ...newApplication
        });
    } catch (error) {
        console.error('Apply error:', error);
        return res.status(500).json({ error: 'Application failed: ' + error.message });
    }
}
