import { Router } from "express";

import { users } from "../../storage/index.js";

const fixiq = Router();

fixiq.get("/check_subscription", (req, res) => {
  const { email } = req.body;

  const user = users.find((user) => user.email === email && user.isActive);

  if (user) {
    res.json({ access: true });
  } else {
    res.json({ access: false });
  }
});

export default fixiq;
