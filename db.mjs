import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "whale_tracker",
  password: "!mo36lt8res*",
  port: 5432,
});

export const query = (text, params) => pool.query(text, params);
