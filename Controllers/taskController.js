const Task = require('../Models/task');

exports.tasksController = {

    getTasks(req, res) {
        const { body } = req;
        const queryPar = req.query;
        if(Object.keys(queryPar).length == 0){              // if there is'nt query
        Task.find({ userEmail: (body.email) })
            .then(result => { res.json(result) })
            .catch(err => console.log(`Error getting Task from db: ${err}`));
        }
        else if(queryPar.category){                            // in case we want to filter category with query request
            Task.find({ category : queryPar.category , userEmail : (body.email) })
            .then(result => { res.json(result) })
            .catch(err => console.log(`Error getting restaurant from db: ${err}`));
        }
     },

    getTask(req, res) {
        Task.findOne({ _id : req.params.taskId })
            .then(result => { res.json(result)})
     },

    addTask(req, res) {
        const { body } = req;
        console.log(body);
        const newTask = new Task(body);
        const result = newTask.save();
        if(result){
            res.json(newTask);
        } else {
         res.status(404).send("Error saving a restaurant");
        }
     },

    searchTask(req,res){
        const { email , searchBy } = req.body;
        if(searchBy){
            let result = Task.search( searchBy );
            Task.find(result).find({userEmail: email})
                .then(result => { res.json(result)});
        }
    },

    deleteTask(req, res) {
        Task.deleteOne({ _id: req.params.taskId } ) 
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error deleting restaurant from db: ${err}`));
    },

    updateTask(req, res) {
        const {body} = req;
        Task.findOneAndUpdate({_id:body._id}, body, {new: true,useFindAndModify: false}, (err, task) => {
            if (err) return res.status(500).send(err);
            return res.send({
                message: "succesful"
            });
        })
    },
    getTasksByCategory(req,res) {
        const body = req.body;
    }
};
