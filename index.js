import express from "express";
import dotenv from "dotenv";
import auth from "./src/auth.js";
import { PORT } from "./src/config.js";
import groupsAuth from "./src/groupsAuth.js";
import accountsAuth from "./src/accountsAuth.js";
import billsAuth from "./src/billsAuth.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(auth);
app.use(groupsAuth);
app.use(accountsAuth);
app.use(billsAuth);

app.listen(PORT, () => console.log(`Listening on ${PORT} port.`));
