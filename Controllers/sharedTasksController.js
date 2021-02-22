const sharedTask = require('../Models/sharedTasks');
const Task = require('../Models/task');
const User = require('../Models/user');

exports.sharedTasksController = {
    shareTask(req, res) {
        const { _id, targetUserEmail } = req.body;
        User.findOne({ email: targetUserEmail })
            .then(re => {
                if (re) {
                    Task.find({ _id: _id })
                        .then(result => {   
                            if(result) {            
                                let newTask = result[0].toJSON();
                                newTask.targetUserEmail = targetUserEmail;
                                newTask.sourceUserEmail = newTask.userEmail;
                                delete newTask.userEmail;
                                delete newTask._id;
                                const addTask = new sharedTask(newTask);
                                const success = addTask.save();
                                if (success) {
                                    res.json({status : "success"});
                                } else {
                                    res.status(400).send("Error saving a shared task");
                                }
                            } else
                            {
                                res.json({status : "error"});
                            }
                        })
                        .catch(err => console.log(`Error getting Task from db: ${err}`));
                }
                else 
                    res.json({status : "error"});
            })
            .catch(err => console.log(`Error getting Task from shared tasks: ${err}`))
    },
    countSharedTask(req, res) {
        const { userEmail } = req.body;
        sharedTask.find({ targetUserEmail: userEmail })
            .then(result => {
                if (result.length) {
                    res.json({ length: result.length, email: result[0].sourceUserEmail ,status : "success"});
                }
                else
                    res.json({ length: 0 , status : "error"});
            })
            .catch(err => console.log(`Error getting Task from db: ${err}`));
    },
    apllyShared(req, res) {
        const { userEmail } = req.body;
        sharedTask.find({ targetUserEmail: userEmail })
            .then(result => {
                if (!result.length)
                    res.json({ status: "failed" });
                result.map((item)=>{
                    let task = item.toJSON();
                    delete task._id;
                    task.userEmail = task.targetUserEmail;
                    delete task.targetUserEmail;
                    delete task.sourceUserEmail;
                    const newTask = new Task(task);
                    newTask.save();
                })
                sharedTask.deleteMany({ targetUserEmail: userEmail })
                    .then(response => res.json({ status: "success" }))
                    .catch(error => res.json(error))
            }).catch(err => console.log(`Error getting Task from shared tasks: ${err}`));
    },
};
