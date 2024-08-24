import { Router } from "express";

import { USERS } from "../../services/mongo/collections.js";

const fixiq = Router();

fixiq.get("/check_subscription", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.sendStatus(400);
    return;
  }

  const user = await USERS.findOne({ email });

  if (user && user.isActive) {
    res.json({ access: true });
  } else {
    res.json({ access: false });
  }
});

export default fixiq;
