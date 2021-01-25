const taskRouter = require('express').Router();
const {tasksController} = require('../Controllers/taskController');

taskRouter.get('/:userId', tasksController.getTasks); // get all tasks of specific user
taskRouter.get('/search/:userId', tasksController.searchTask); // search for specific task by search word
taskRouter.get('/view/:taskId', tasksController.getTask); // get specific task
taskRouter.post('/',tasksController.addTask); // add task to user
taskRouter.put('/:taskId',tasksController.updateTask); // edit task of user
taskRouter.delete('/:taskId',tasksController.deleteTask); // delete task

module.exports = {taskRouter}; 