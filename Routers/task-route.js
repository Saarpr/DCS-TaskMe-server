const taskRouter = require('express').Router();
const {tasksController} = require('../Controllers/taskController');
const {sharedTasksController} = require('../Controllers/sharedTasksController');


taskRouter.post('/', tasksController.getTasks); // 
taskRouter.post('/search/', tasksController.searchTask); // 
taskRouter.get('/view/:taskId', tasksController.getTask); //
taskRouter.post('/add-task',tasksController.addTask); //
taskRouter.put('/',tasksController.updateTask); // 
taskRouter.delete('/:taskId',tasksController.deleteTask); //
taskRouter.post('/stats/', tasksController.getTasksByCategory); // 

//shared tasks

taskRouter.post('/share-task', sharedTasksController.shareTask); 
taskRouter.post('/is-any-shared', sharedTasksController.countSharedTask); 
taskRouter.post('/apply-shared', sharedTasksController.apllyShared); 



module.exports = {taskRouter}; 