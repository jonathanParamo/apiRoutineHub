import pool from "../dbConnection.js"

export async function getTodosByIDModel(id) {
  try {
    const [rows] = await pool.query(`
      SELECT todos.*, shared_todos.shared_with_id
      FROM todos
      LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
      WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
    `, [id, id]);
    return rows;
  } catch (error) {
    throw new Error('Error fetching todos from the database');
  }
}

export async function userExistsModel(user_id) {
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE id = ?', [user_id]);
    return rows.length > 0;
  } catch (error) {
    throw new Error('Error checking user existence in the database');
  }
}

export async function createTodoModel(user_id, title) {
  if (!user_id || !title) {
    throw new Error("user_id and title are required");
  }

  const userExists = await userExistsModel(user_id);
  if (!userExists) {
    throw new Error("User with provided user_id does not exist");
  }

  const [result] = await pool.query(
    `
    INSERT INTO todos (user_id, title)
    VALUES (?, ?)
    `,
    [user_id, title]
  );
  const todoID = result.insertId;
  return getTodoModel(todoID);
};

export async function getTodoModel(id) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM todos
    WHERE id = ?;
    `,
    [id]
  );
  return rows[0];
};

export async function shareTodoModel(todo_id, user_id, shared_with_id) {
  if (!todo_id || !user_id || !shared_with_id) {
    throw new Error("Invalid todo_id, user_id, or shared_with_id");
  }

  const [result] = await pool.query(
    `
    INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
    VALUES ( ?, ?, ?);
    `,
    [todo_id, user_id, shared_with_id]
  );
  return result.insertId;
};

export async function deleteTodoModel(id) {

  if (!id) {
    throw new Error("Unauthorized: Todo does not belong to the user");
  }

  const [result] = await pool.query(
    `
    DELETE FROM todos WHERE id = ?;
    `,
    [id]
  );
  return result;
};

export async function toggleCompletedModel(id, value) {
  const todoBelongsToUser = await validateTodoBelongsToUser(id, userId);

  if (!todoBelongsToUser) {
    throw new Error("Unauthorized: Todo does not belong to the user");
  }

  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query(
    `
    UPDATE todos
    SET completed = ${newValue}
    WHERE id = ?;
    `,
    [id]
  );
  return result;
};

async function validateTodoBelongsToUser(todoId, userId) {
  try {
    const [rows] = await pool.query('SELECT id FROM todos WHERE id = ? AND user_id = ?', [todoId, userId]);

    return rows.length > 0;
  } catch (error) {
    throw new Error('Error validating todo ownership');
  }
}
