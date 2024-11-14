import { USERS } from "../../collections.js";

export function getUser({ query, params }) {
  return USERS().findOne(query, {
    _id: false,
  });
}

export function getUserByEmail(email) {
  return getUser({ query: { email } });
}
