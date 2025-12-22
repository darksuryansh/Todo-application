import express from "express";
import { createTodo } from "../controllers/todo.js";
import {getTodos} from "../controllers/todo.js";
import {updateTodo} from "../controllers/todo.js";
import {deleteTodo} from "../controllers/todo.js";

const router = express.Router();

router.route("/create").post(createTodo);
router.route("/todos").get(getTodos);
router.route("/:todoId").put(updateTodo);
router.route("/:todoId").delete(deleteTodo);



export default router;