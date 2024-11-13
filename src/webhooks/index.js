import { Router } from "express";
import { newGumroadPayment } from "./newGumroadPayment/newGumroadPayment.js";

function catchHook(id) {
  const HOOKS = {
    lvuoig67rcoh: newGumroadPayment,
  };

  if (id in HOOKS) {
    return HOOKS[id];
  } else {
    throw new Error(`Unknown webhook ID: ${id}`);
  }
}

const webhooks = Router();

webhooks.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Webhook must have an ID");
    }

    const result = catchHook(id)(req.body);
    res.sendStatus(result ? 200 : 400);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

export default webhooks;
