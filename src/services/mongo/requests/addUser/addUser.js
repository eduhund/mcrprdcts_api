import { USERS } from "../../collections.js";

export function addUser({ data }) {
  return USERS().insertOne(data);
}
