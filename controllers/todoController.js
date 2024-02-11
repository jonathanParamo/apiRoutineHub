import {
  getTodosByIDModel,
  shareTodoModel,
  deleteTodoModel,
  toggleCompletedModel,
  createTodoModel,
} from "../models/todoModel.js";
import { getUserByEmail } from "../models/userModel.js";
import { successResponse, errorResponse } from "../Red/responses.js";

export async function createTodoController(req, res) {
  try {
    const { user_id, title } = req.body;

    if (!user_id || !title) {
      return errorResponse(req, res, "user_id and title are required");
    }

    const newTodo = await createTodoModel(user_id, title);
    successResponse(req, res, newTodo, 201);
  } catch (error) {
    console.error("Error creating todo:", error);
    errorResponse(req, res, "Internal Server Error");
  }
};

export async function getTodosByIDController(req, res) {
  const todos = await getTodosByIDModel(req.params.id);
  successResponse(req, res, todos);
};

export async function shareTodoController(req, res) {
  const { todo_id, user_id, email } = req.body;
  const userToShare = await getUserByEmail(email);
  const sharedTodo = await shareTodoModel(todo_id, user_id, userToShare.id);
  successResponse(req, res, sharedTodo, 201);
};

export async function deleteTodoController(req, res) {
  await deleteTodoModel(req.params.id);
  successResponse(req, res, "Todo deleted successfully", 204);
};

export async function toggleCompletedController(req, res) {
  const { value } = req.body;
  const newValue = value === true ? "TRUE" : "FALSE";
  await toggleCompletedModel(req.params.id, newValue);
  successResponse(req, res, "Toggle completed successfully");
};
