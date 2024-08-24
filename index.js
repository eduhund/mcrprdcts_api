import express, { Router } from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const api = Router();
const fixiq = Router();

let users = [];

fixiq.post("/webhook", (req, res) => {
  const { email, purchase_id, subscription_id, subscription_status } = req.body;

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
});

fixiq.get("/check_subscription", (req, res) => {
  const { email } = req.body;

  const user = users.find((user) => user.email === email && user.isActive);

  if (user) {
    res.json({ access: true });
  } else {
    res.json({ access: false });
  }
});

api.use("/fixiq", fixiq);
app.use("/api", api);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
