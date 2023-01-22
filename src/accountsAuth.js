import { Router } from "express";
import { jwt_Secret, MYSQL_CONFIG } from "./config.js";
import { isLoggedIn } from "./groupsAuth.js";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const router = Router();

router.post("/accounts", isLoggedIn, async (req, res) => {
  const group_id = +req.body.group_id;
  const token = req.headers.authorization?.split(" ")[1];
  const payload = jwt.verify(token.replace("Bearer ", ""), jwt_Secret);
  const user_id = payload.id;

  if (!group_id || !token) {
    return res
      .status(400)
      .send(
        `Your group_id ${group_id} does not exists or can not find your token ${token}`
      );
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    let result = await con.execute(
      `INSERT INTO accounts(group_id, user_id) VALUES
      (${mysql.escape(group_id)}, ${mysql.escape(user_id)})`
    );

    await con.end();
    res.send(result).end();
  } catch (error) {
    return res.status(400).send({
      message: `Can not register ${token} in to accounts`,
    });
  }
});

export default router;
