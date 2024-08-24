import { db } from "./mongo.js";

const databases = {
  fixiq: db.db("fixiq"),
};

export function getDatabase(name) {
  const database = !databases[name];
  if (!database) {
    throw new Error("Cluster hasn't a database with this name!");
  }

  return database;
}

export const USERS = db.db("fixiq").collection("users");
