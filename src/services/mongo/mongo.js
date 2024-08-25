import { MongoClient } from "mongodb";

const { DB } = process.env;

const db = new MongoClient(DB);

async function startDatabase() {
  try {
    db.connect();
  } catch {
    console.error("Can't connect to the DB cluster!");
  }
}

export { db, startDatabase };
