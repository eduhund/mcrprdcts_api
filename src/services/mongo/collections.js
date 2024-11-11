import { db } from "./mongo.js";

const databases = {
  fixiq: db.db("fixiq"),
  shlow: db.db("shlow"),
};

export function USERS(database) {
  try {
    return databases[database].collection("users");
  } catch {
    throw new Error();
  }
}
