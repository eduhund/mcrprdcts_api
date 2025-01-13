import { USERS } from "../../collections.js";

export function updateUser({ query, data }) {
  return USERS().findOneAndUpdate(query, data);
}
