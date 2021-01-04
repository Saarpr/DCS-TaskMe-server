const taskRouter = require('express').Router();
const {tasksController} = require('../Controllers/taskController');

taskRouter.get('/:userId', tasksController.getTasks);
taskRouter.get('/search/:userId', tasksController.searchTask);
taskRouter.get('/view/:taskId', tasksController.getTask);
taskRouter.post('/',tasksController.addTask);
taskRouter.put('/:taskId',tasksController.updateTask);
taskRouter.delete('/:taskId',tasksController.deleteTask);

module.exports = {taskRouter}; 