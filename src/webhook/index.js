import { Router } from "express";

import { USERS } from "../services/mongo/collections.js";

const webhook = Router();

webhook.post("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }
  switch (id) {
    case "lvuoig67rcoh":
      const { email, purchase_id, subscription_id, subscription_status } =
        req.body;

      if (subscription_status === "active") {
        USERS.insertOne({
          email,
          purchase_id,
          subscription_id,
          isActive: true,
        });
      }

      if (subscription_status === "canceled") {
        await USERS.findOneAndUpdate({ email }, { $set: { isActive: false } });
      }

      res.sendStatus(200);
      return;

    default:
      res.sendStatus(400);
  }
});

export default webhook;
