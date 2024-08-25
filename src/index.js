import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import api from "./api/index.js";
import webhook from "./webhook/index.js";
import { startDatabase } from "./services/mongo/mongo.js";

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());

app.use("/api", api);
app.use("/webhook", webhook);

startDatabase();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
