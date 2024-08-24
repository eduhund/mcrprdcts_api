import { Router } from "express";

import { users } from "../storage/index.js";

const webhook = Router();

webhook.post("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }
  switch (id) {
    case "lvuoig67rcoh":
      const { email, purchase_id, subscription_id, subscription_status } =
        req.body;

      if (subscription_status === "active") {
        users.push({
          email,
          purchase_id,
          subscription_id,
          isActive: true,
        });
      }

      if (subscription_status === "cancelled") {
        users = users.map((user) =>
          user.subscription_id === subscription_id
            ? { ...user, isActive: false }
            : user
        );
      }

      res.sendStatus(200);
      return;

    default:
      res.sendStatus(400);
  }
});

export default webhook;
