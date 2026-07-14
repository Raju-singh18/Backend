
const express = require("express");
const { createTodo } = require("../controllers/createTodo");
const { getTodo, getTodoById } = require("../controllers/getTodo");
const { updateTodo, deleteTodo } = require("../controllers/updateTodo");

const router = express.Router();

router.get("/:id", getTodoById);
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodo);
router.put("/updateTodo/:id",updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
