import { Router } from "express";

import fixiq from "./fixiq/index.js";

const api = Router();

api.use("/fixiq", fixiq);

export default api;
