const Task = require('../models/task');

exports.TaskDBcontroller = {
    getTasks(req, res) {
        const query = req.query; 
        if(Object.keys(query).length == 0){
            Task.find({ })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting Task from db: ${err}`));
        }
        else if(query.name){
            Task.find({ name: query.name })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting Task from db: ${err}`));
        }
    },
    getTask(req, res) {
        Task.findOne({ id: req.params.id })
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting Task from db: ${err}`));

    },
    addTask(req, res) {
        const {body} = req;
        const newTask = new Task(body);
        const result = newTask.save();
        if (result) {
            res.json(newTask)
        } else {
            res.status(404).send("Error saving a Task");
        }
    },
    deleteTask(req, res) {
        Task.deleteOne({ id: req.params.id } ) 
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error deleting Task from db: ${err}`));
    },
    updateTask(req, res) {
        const {body} = req;
        Task.updateOne({ id: req.params.id } , body ) 
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error updating Task from db: ${err}`));
    },
}