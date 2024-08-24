import express from "express";
import bodyParser from "body-parser";

import api from "./src/api/index.js";
import webhook from "./src/webhook/index.js";

const app = express();
app.use(bodyParser.json());

app.use("/api", api);
app.use("/webhook", webhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
