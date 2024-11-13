import { USERS } from "../../collections.js";

export function updateUser({ query, data, params }) {
  return USERS().updateOne(query, data);
}
