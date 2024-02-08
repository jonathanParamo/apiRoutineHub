import {
  getTodosByIDModel,
  shareTodoModel,
  deleteTodoModel,
  toggleCompletedModel,
  createTodoModel,
} from "../models/todoModel.js";
import { getUserByEmail } from "../models/userModel.js";

export async function createTodoController(req, res) {
  try {
    const { user_id, title } = req.body;

    if (!user_id || !title) {
      return res.status(400).send({ error: "user_id and title are required" });
    }

    const newTodo = await createTodoModel(user_id, title);
    res.status(201).send(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export async function getTodosByIDController(req, res) {
  const todos = await getTodosByIDModel(req.params.id);
  res.status(200).send(todos);
};

export async function shareTodoController(req, res) {
  const { todo_id, user_id, email } = req.body;
  const userToShare = await getUserByEmail(email);
  const sharedTodo = await shareTodoModel(todo_id, user_id, userToShare.id);
  res.status(201).send(sharedTodo);
};

export async function deleteTodoController(req, res) {
  await deleteTodoModel(req.params.id);
  res.send({ message: "Todo deleted successfully" });
};

export async function toggleCompletedController(req, res) {
  const { value } = req.body;
  const newValue = value === true ? "TRUE" : "FALSE";
  await toggleCompletedModel(req.params.id, newValue);
  res.status(200).send({ message: "Toggle completed successfully" });
};
