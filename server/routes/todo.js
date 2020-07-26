var express = require('express');
const todoController = require('../controller/todo.controller');
var router = express.Router();

// get Todo List
router.get('/getAll', function (req, res, next) {
  try {
    todoController.getAll().then(result => {
      return res.status(200).send(result);
    }, err => {
      return next(err)
    })
  }
  catch (err) {
    return next(err)
  }
});

// add Todo 
router.post('/addTodo', (req, res, next) => {
  const todoDetails = req.body;
  try {
    todoController.addTodo(todoDetails).then(result => {
      return res.status(201).send(result);
    }, err => {
      return next(err)
    })
  }
  catch (err) {
    return next(err)
  }
})

// delete Todo
router.post('/deleteTodo', (req, res, next) => {
  const todoDetails = req.body;
  try {
    todoController.deleteTodo(todoDetails).then(result => {
      return res.status(200).send(result);
    }, err => {
      return next(err)
    })
  }
  catch (err) {
    return next(err)
  }
})

// update status of Todo
router.post('/updateTodo', (req, res, next) => {
  const todoDetails = req.body;
  try {
    todoController.updateTodo(todoDetails).then(result => {
      return res.status(200).send(result);
    }, err => {
      return next(err)
    })
  }
  catch (err) {
    return next(err)
  }
})

module.exports = router;
