const taskRouter = require('express').Router();
const {tasksController} = require('../Controllers/taskController');

taskRouter.post('/', tasksController.getTasks); // get all tasks of specific user
taskRouter.post('/search/', tasksController.searchTask); // search for specific task by search word
taskRouter.get('/view/:taskId', tasksController.getTask); // get specific task
taskRouter.post('/add-task',tasksController.addTask); // add task to user
taskRouter.put('/',tasksController.updateTask); // edit task of user
taskRouter.delete('/:taskId',tasksController.deleteTask); // delete task
taskRouter.get('/stats/:userEmail', tasksController.getTask); // get specific task


module.exports = {taskRouter}; 