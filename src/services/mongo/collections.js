import { db } from "./mongo.js";

const databases = {
  fixiq: db.db("fixiq"),
  shlow: db.db("shlow"),
};

export function USERS() {
  try {
    return db.db("main").collection("users");
  } catch {
    throw new Error();
  }
}
