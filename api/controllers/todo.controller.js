const { Todo } = require('../models/todo.model');

//Utils
const { filterObject } = require('../utils/filterObject');

//Get all todos (tested)
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { status: 'active' }
    });

    res.status(200).json({
      status: 'success',
      data: { todos }
    });
  } catch (error) {
    console.log(error);
  }
};

//Create new todo (tested)
exports.createTodo = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({
        status: 'error',
        message: 'Must provide content'
      });

      return;
    }

    const newTodo = await Todo.create({ content });

    res.status(201).json({
      status: 'success',
      data: { newTodo }
    });
  } catch (error) {
    console.log(error);
  }
};

//Update todo by given id (PATCH)
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObject(req.body, 'content');

    const todo = await Todo.findOne({
      where: { id: id, status: 'active' }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update todo, invalid ID'
      });

      return;
    }

    await todo.update({ ...data });

    res.status(204).json({
      status: 'success'
    });
  } catch (error) {
    console.log(error);
  }
};

//Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      where: { status: 'active', id: id }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete todo, invalid ID'
      });

      return;
    }

    await todo.update({ status: 'deleted' });

    res.status(204).json({
      status: 'success',
      message: 'To do deleted'
    });
  } catch (error) {
    console.log(error);
  }
};
