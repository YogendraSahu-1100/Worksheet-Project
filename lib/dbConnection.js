import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "worksheet_db",
  connectionLimit: 5,
});

export async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Database connection established successfully!");
    return true;
  } catch (err) {
    console.error("Database connection failed:", err);
    return false;
  } finally {
    if (conn) conn.release();
  }
}
