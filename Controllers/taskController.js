const User = require('../Models/user');


exports.tasksController = {
    addTask(req, res) {
        const { body } = req;
        console.log(body);
        User.findOne({googleId:req.params.id})
            .then(node => {
                node.tasks.push(body)
                return node.save()
            .then(node => res.send(node.tasks))})
     },

    deleteTask(req, res) {
        const { body } = req;
        console.log(body);
        User.findOne({googleId:req.params.id})
            .then(node => {
                node.tasks.pull({_id:body._id})
                return node.save()
                    .then(node => res.send(node.tasks))})
    },

    updateTask(req, res) {
        const { body } = req;
        console.log(body);
        User.findOne({googleId:req.params.id})
            .then(node => {
                item = node.tasks.find(o => o._id == body._id)
                if(body.taskName)
                    item["taskName"] = body.taskName
                if(body.color)
                    item["color"] = body.color
                if(body.duration)
                    item["duration"] = body.duration
                if(body.dateTime)
                    item["taskName"] = body.dateTime
                return node.save()
                    .then(node => res.send(node.tasks))})
    }
}