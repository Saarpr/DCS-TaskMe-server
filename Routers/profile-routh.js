// const profileRouter = require('express').Router();
// const {tasksController} = require('../Controllers/taskController');

// // const authCheck = (req,res,next)=>{
// //     if(!req.user){
// //         res.status(403).send();
// //     }
// //     else{
// //         next();
// //     }
// // };
// // profileRouter.get('/', authCheck, (req, res) => {
// //     res.send(req.user);    
// // });

// profileRouter.get('/', tasksController.authCheck);
// profileRouter.post('/:id',tasksController.addTask);
// profileRouter.put('/:id',tasksController.updateTask);
// profileRouter.delete('/:id',tasksController.deleteTask);

// module.exports = {profileRouter}; 