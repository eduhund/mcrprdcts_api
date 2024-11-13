import { Router } from "express";

import fixiq from "./fixiq/index.js";
import shlow from "./shlow/index.js";
import checkSubscription from "./checkSubscription/checkSubscription.js";

const api = Router();

api.use("/fixiq", fixiq);
api.use("/shlow", shlow);

api.get("/check_subscription", checkSubscription);

export default api;
