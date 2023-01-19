import dotenv from "dotenv";

dotenv.config();

export const PORT = 5_000;

export const MYSQL_CONFIG = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
};

export const jwt_Secret = process.env.JWT_SECRET;
