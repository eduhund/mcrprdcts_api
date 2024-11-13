import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import api from "./api/index.js";
import webhooks from "./webhooks/index.js";
import { startDatabase } from "./services/mongo/mongo.js";

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);
app.use("/webhook", webhooks);

startDatabase();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
