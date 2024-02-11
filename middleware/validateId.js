import { errorResponse } from "../Red/responses.js";
import pool from "../dbConnection.js";

function validateId(tableName) {
  return async (req, res, next) => {
    const id = req.params.id;

    try {
      const [rows] = await pool.query(`
        SELECT * FROM users WHERE id = ?
      `, [id]);

      if (rows.length === 0) {
        errorResponse(req, res, 'Invalid ID', 400);
      }

      next();
    } catch (error) {
      errorResponse(req, res, 'Internet server error');
    }
  };
}

export default validateId;
