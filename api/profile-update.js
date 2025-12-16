import { MongoClient, ObjectId } from 'mongodb';

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
        const { userId, annualIncome, creditScore } = req.body;

        const client = await connectDB();
        const db = client.db('credit_card_db');
        const usersCollection = db.collection('users');

        const result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { annualIncome: parseInt(annualIncome), creditScore: parseInt(creditScore) } }
        );

        await client.close();

        return res.status(200).json({ success: result.modifiedCount > 0 });
    } catch (error) {
        console.error('Profile update error:', error);
        return res.status(500).json({ error: 'Profile update failed: ' + error.message });
    }
}
