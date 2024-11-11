import { Router } from "express";

import { USERS } from "../../services/mongo/collections.js";

const shlow = Router();

shlow.get("/check_subscription", async (req, res) => {
  const { user_id, email } = req.query;

  function sendResponse(user) {
    if (user && user.isActive) {
      res.json({ access: true });
    } else {
      res.json({ access: false });
    }
  }

  if (!user_id) {
    res.sendStatus(400);
    return;
  }

  if (email) {
    const user = await USERS("shlow").findOneAndUpdate(
      { email },
      {
        $set: {
          figmaUserId: user_id,
        },
      }
    );

    sendResponse(user);
  } else {
    const user = await USERS("shlow").findOne({ figmaUserId: user_id });

    sendResponse(user);
  }
});

export default shlow;
