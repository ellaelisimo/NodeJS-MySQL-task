import { Router } from "express";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "./config.js";

const router = Router();

router.get("/bills/:group_id", async (req, res) => {
  const group_id = +req.body.group_id;

  if (!group_id) {
    return res
      .status(400)
      .send(
        `Please provide a proper group_id, yours ${group_id} does not exists.`
      );
  }
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const result = await con.execute(
      `SELECT * FROM bills WHERE group_id = ${mysql.escape(group_id)}`
    );

    await con.end();
    res.send(result).end();
  } catch (error) {
    res
      .status(400)
      .send(`Something went wrong. Can not read ${group_id} group_id.`);
  }
});

router.post("/bills", async (req, res) => {
  const group_id = +req.body.group_id;
  const amount = +req.body.amount;
  const description = req.body.description;

  if (!group_id || !amount || !description) {
    return res
      .status(400)
      .send(
        `Your group_id ${group_id}, amount ${amount}, description ${description} is not correct.`
      )
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const result = await con.execute(
      `INSERT INTO bills (group_id, amount, description) VALUES (${mysql.escape(
        group_id
      )}, ${mysql.escape(amount)}, ${mysql.escape(description)})`
    );

    await con.end();
    res.send(result).end();
  } catch (error) {
    res
      .status(400)
      .send(`Please provide a proper gruop_id, amount and description`)
      .end();
  }
});

export default router;
