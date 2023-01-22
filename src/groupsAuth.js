import { Router } from "express";
import Joi from "joi";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG, jwt_Secret } from "./config.js";
import jwt from "jsonwebtoken";

const router = Router();

// const groupsSchema = Joi.object({
//   name: Joi.string(),
// });

router.get("/groups", async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    let result = await con.execute(`SELECT * FROM groups_table`);

    await con.end();
    res.send(result).end();
  } catch (error) {
    res.status().send({ error: "Can't get the groups table" }).end();
  }
});

export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const user = jwt.verify(token, jwt_Secret);
    console.log(user);
    next();
  } catch (err) {
    return res.status(400).send(`Incorrect Token`).end();
  }
};

router.post("/groups", isLoggedIn, async (req, res) => {
  const name = req.body.name.trim();

  if (!name) {
    return res.status(400).send({ message: "Please input name of the group." });
  }
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [data] = await con.execute(
      `INSERT INTO groups_table (name) VALUES (${mysql.escape(name)})`
    );

    await con.end();
    res.send(data);
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send({ message: "You are not in our base, please register" })
      .end();
  }
});

export default router;
