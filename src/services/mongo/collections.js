import { db } from "./mongo.js";

export function USERS() {
  try {
    return db.db("main").collection("users");
  } catch {
    throw new Error();
  }
}

export function PRODUCTS() {
  try {
    return db.db("main").collection("products");
  } catch {
    throw new Error();
  }
}
