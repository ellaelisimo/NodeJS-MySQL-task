import { Router } from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "./config.js";
import { jwt_Secret } from "./config.js";
import jwt from "jsonwebtoken";

const router = Router();

export const userSchema = Joi.object({
  full_name: Joi.string(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

router.post("/register", async (req, res) => {
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);

    if (!userData) {
      return res.status(400).send({ error: `Wrong data` });
    }
  } catch (err) {
    return res.status(400).send({ error: `Registration went wrong` }).end();
  }
  try {
    const hashedPassword = bcrypt.hashSync(userData.password);

    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [data] =
      await con.execute(`INSERT INTO users (full_name, email, password) 
      VALUES (${mysql.escape(userData.full_name)},${mysql.escape(
        userData.email
      )}, "${hashedPassword}")`);

    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: `Unexpected error: Please try again` })
      .end();
  }
});

router.post("/login", async (req, res) => {
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: "Incorrect data send" }).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [data] = await con.execute(
      `SELECT * FROM users WHERE email = ${mysql.escape(userData.email)}`
    );

    await con.end();

    if (!data) {
      return res
        .status(400)
        .send({ message: "Please provide a valid email or password" })
        .end();
    }
    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);

    if (isAuthed) {
      const token = jwt.sign(
        {
          id: data[0].id,
          email: data[0].email,
        },
        jwt_Secret
      );
      return res.send({ message: `Succesfully logged in ${token}` }).end();
    }
    return res.status(403).send({ error: "Invalid credentials" }).end();
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ error: "There was error with your login information" })
      .end();
  }
});

export default router;
