import pg from "pg";

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "shop_fs",
});

export default pool;
