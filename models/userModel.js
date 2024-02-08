import pool from "../dbConnection.js";

export async function getUserByIDModel(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

export async function getUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [email]);
  return rows[0];
}