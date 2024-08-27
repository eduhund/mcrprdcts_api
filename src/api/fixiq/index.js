import { Router } from "express";

import { USERS } from "../../services/mongo/collections.js";

const fixiq = Router();

fixiq.get("/check_subscription", async (req, res) => {
  const { user_id, email } = req.query;

  function sendResponse(user) {
    if (user && user.isActive) {
      res.json({ access: true });
    } else {
      res.json({ access: false });
    }
  }
  console.log(user_id);

  if (!user_id) {
    res.sendStatus(400);
    return;
  }

  if (email) {
    const user = await USERS.findOneAndUpdate(
      { email },
      { figmaUserId: user_id }
    );

    sendResponse(user);
  } else {
    const user = await USERS.findOne({ figmaUserId: user_id });

    sendResponse(user);
  }
});

export default fixiq;
