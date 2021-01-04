const Task = require('../Models/task');

exports.tasksController = {
    getTasks(req, res) {
        const queryPar = req.query;
        if(Object.keys(queryPar).length == 0){              // if there is'nt query
        Task.find({ userId: Number(req.params.userId) }) 
            .then(result => { res.json(result) })
            .catch(err => console.log(`Error getting Task from db: ${err}`));
        }
        else if(queryPar.category){                            // in case we want to filter category with query request
            Task.find({ category : queryPar.category , userId : Number(req.params.userId) })
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
        const newTask = new Task(body);
        const result = newTask.save();
        if(result){
            res.json(newRestaurant);
        } else {
         res.status(404).send("Error saving a restaurant");
        }
     },
     searchTask(req,res){
        const query = req.query;
        // const findIt = "/" + query.searchBy + "/";
        if(query.searchBy){
            let query = Task.search( "blue" );
            Task.find(query)
                .then(result => { res.json(result)});
        }
    },
    deleteTask(req, res) {
        Task.deleteOne({ _id: req.params.taskId } ) 
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error deleting restaurant from db: ${err}`));
    },

    updateTask(req, res) {
        console.log('updateee');
        // const { body } = req;
        // Task.findOne({googleId:req.params.id})
        //     .then(node => {
        //         let item = node.tasks.find(o => o._id == body._id)
        //         console.log("this is body 2" , body)
        //         if(body.taskName)
        //             item["taskName"] = body.taskName
        //         if(body.color)
        //             item["color"] = body.color
        //         if(body.duration)
        //             item["duration"] = body.duration
        //         if(body.dateTime)
        //             item["taskName"] = body.dateTime
        //         console.log("this is item" , item)
        //         console.log("this is node" , node)
        //         return node.save()
        //             .then(node => res.send(node.tasks))})

    }
    };