import { Router } from "express";

import checkSubscription from "./checkSubscription/checkSubscription.js";

const api = Router();

api.get("/check_subscription", checkSubscription);

export default api;
