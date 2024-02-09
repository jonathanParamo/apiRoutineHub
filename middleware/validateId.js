import pool from "../dbConnection.js";

function validateId(tableName) {
  return async (req, res, next) => {
    const id = req.params.id;

    try {
      const [rows] = await pool.query(`
        SELECT * FROM users WHERE id = ?
      `, [id]);

      if (rows.length === 0) {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Internet server error' });
    }
  };
}

export default validateId;
