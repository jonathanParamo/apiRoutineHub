import express from "express";
import validateId from "../middleware/validateId.js";
import {
  getTodosByIDController,
  shareTodoController,
  deleteTodoController,
  toggleCompletedController,
  createTodoController,
} from "../controllers/todoController.js";
import { getUserByIDController } from "../controllers/userController.js"

const router = express.Router();

router.get("/todos");
router.post("/todos", createTodoController);
router.get("/todos/:id", validateId('todos'), getTodosByIDController);
router.get("/users/:id", validateId('users'), getUserByIDController);
router.put("/todos/:id", toggleCompletedController);
router.delete("/todos/:id", deleteTodoController);
router.post("/todos/shared_todos", shareTodoController);

export default router;
