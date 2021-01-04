const taskRouter = require('express').Router();
const {tasksController} = require('../Controllers/taskController');

taskRouter.get('/:id', tasksController.getTasks);
taskRouter.get('/view/:id', tasksController.getTask);
taskRouter.post('/:id',tasksController.addTask);
taskRouter.put('/:id',tasksController.updateTask);
taskRouter.delete('/:id',tasksController.deleteTask);

module.exports = {taskRouter}; 