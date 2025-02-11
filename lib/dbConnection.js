import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "127.0.0.1", 
  user: "root",     
  password: "root",
  database: "worksheet_db",
  connectionLimit: 5,
});

export async function query(sql, params) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, params);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
}
