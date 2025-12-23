import express from "express";
import { createTodo } from "../controllers/todo.js";
import {getTodos} from "../controllers/todo.js";
import {updateTodo} from "../controllers/todo.js";
import {deleteTodo} from "../controllers/todo.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated,createTodo);
router.route("/todos").get(getTodos);
router.route("/:todoId").put(isAuthenticated,updateTodo);
router.route("/:todoId").delete(isAuthenticated,deleteTodo);

export default router;