import pool from "../dbConnection.js";

function validateId(tableName) {
  return async (req, res, next) => {
    const id = req.params.id;
    if (!await isValidId(id, tableName)) {
      return res.status(400).json({ error: 'ID no válido' });
    }
    next();
  };
}

async function isValidId(id, tableName = 'users') {
  try {
    const [rows] = await pool.query(`SELECT * FROM ?? WHERE id = ?`, [tableName, id]);

    return rows.length > 0;
  } catch (error) {
    console.error('Error validating ID in the database:', error);
    return false;
  }
}

export default validateId;
