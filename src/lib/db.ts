import { MongoClient, type Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * One shared client per server instance (dev and production). Creating a new
 * client per call leaks connections on serverless hosts like Vercel.
 */
function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return Promise.reject(new Error('Missing environment variable: "MONGODB_URI"'));
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    global._mongoClientPromise = client.connect().catch((error) => {
      global._mongoClientPromise = undefined;
      throw error;
    });
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB_NAME || "mounties-youth-basketball");
}
