// const User = require('../Models/user');

// exports.tasksController = {
//     addTask(req, res) {
//         const { body } = req;
//         User.findOne({googleId:req.params.id})
//             .then(node => {
//                 node.tasks.push(body)
//                 return node.save()
//             .then(node => res.send(node.tasks))})
//      },

//     deleteTask(req, res) {
//         const { body } = req;
//         User.findOne({googleId:req.params.id})
//             .then(node => {
//                 node.tasks.pull({_id:body._id})
//                 return node.save()
//                     .then(node => res.send(node.tasks))})
//     },

//     updateTask(req, res) {
//         const { body } = req;
//         console.log("this is body 1" , body)
//         User.findOne({googleId:req.params.id})
//             .then(node => {
//                 let item = node.tasks.find(o => o._id == body._id)
//                 console.log("this is body 2" , body)
//                 if(body.taskName)
//                     item["taskName"] = body.taskName
//                 if(body.color)
//                     item["color"] = body.color
//                 if(body.duration)
//                     item["duration"] = body.duration
//                 if(body.dateTime)
//                     item["taskName"] = body.dateTime
//                 console.log("this is item" , item)
//                 console.log("this is node" , node)
//                 return node.save()
//                     .then(node => res.send(node.tasks))})

//     },
//     /////////////////////////////////////////////////////////
//     authCheck(req,res){
//         if(!req.user){
//             res.status(403).send();
//         }
//         else{
//             res.send(req.user);
//         }
//     }
//     };


const Task = require('../Models/task');

exports.tasksController = {
    getTasks(req, res) {
        console.log('all tasks');
        const queryPar = req.query;
        if(Object.keys(queryPar).length == 0){              // if there is'nt query
        Task.find({ userId: Number(req.params.id) }) 
            .then(result => { res.json(result) })
            .catch(err => console.log(`Error getting Task from db: ${err}`));
        }
        else if(queryPar.category){                            // in case we want to filter category with query request
            Task.find({ category: queryPar.category })
            .then(result => { res.json(result) })
            .catch(err => console.log(`Error getting restaurant from db: ${err}`));
        }
     },
    getTask(req, res) {
        console.log('ont task');                // id means task id
        Task.findOne({ _id:req.params.id })
            .then(result => { res.json(result)})
     },
    addTask(req, res) {
        const { body } = req;
        Task.findOne({googleId:req.params.id})
            .then(node => {
                node.tasks.push(body)
                return node.save()
            .then(node => res.send(node.tasks))})
     },

    deleteTask(req, res) {
        const { body } = req;
        Task.findOne({googleId:req.params.id})
            .then(node => {
                node.tasks.pull({_id:body._id})
                return node.save()
                    .then(node => res.send(node.tasks))})
    },

    updateTask(req, res) {
        const { body } = req;
        console.log("this is body 1" , body)
        Task.findOne({googleId:req.params.id})
            .then(node => {
                let item = node.tasks.find(o => o._id == body._id)
                console.log("this is body 2" , body)
                if(body.taskName)
                    item["taskName"] = body.taskName
                if(body.color)
                    item["color"] = body.color
                if(body.duration)
                    item["duration"] = body.duration
                if(body.dateTime)
                    item["taskName"] = body.dateTime
                console.log("this is item" , item)
                console.log("this is node" , node)
                return node.save()
                    .then(node => res.send(node.tasks))})

    }
    };