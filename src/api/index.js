import { Router } from "express";

import fixiq from "./fixiq/index.js";
import shlow from "./shlow/index.js";

const api = Router();

api.use("/fixiq", fixiq);
api.use("/shlow", shlow);

export default api;
