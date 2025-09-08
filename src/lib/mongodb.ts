import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Database collections
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('neurovox');
}

// Collection helpers
export async function getUsersCollection() {
  const db = await getDb();
  return db.collection('users');
}

export async function getBrainSignalsCollection() {
  const db = await getDb();
  return db.collection('brain_signals');
}

export async function getMindLogCollection() {
  const db = await getDb();
  return db.collection('mind_log');
}

export async function getDailyReportsCollection() {
  const db = await getDb();
  return db.collection('daily_reports');
}

export async function getTestimonialsCollection() {
  const db = await getDb();
  return db.collection('testimonials');
}

export async function getEmergencyAlertsCollection() {
  const db = await getDb();
  return db.collection('emergency_alerts');
}

// Export the MongoClient promise
export default clientPromise;