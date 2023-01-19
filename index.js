import express from "express";
import dotenv from "dotenv";
import auth from "./src/auth.js";
import { PORT } from "./src/config.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(auth);

app.listen(PORT, () => console.log(`Listening on ${PORT} port.`));
