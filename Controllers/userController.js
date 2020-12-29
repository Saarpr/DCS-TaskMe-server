// // const User = require('../models/user');

// exports.userController = {
//     getUsers(req, res) {
//         const query = req.query; 
//         if(Object.keys(query).length == 0){
//             User.find({ })
//             .then(docs => { res.json(docs) })
//             .catch(err => console.log(`Error getting User from db: ${err}`));
//         }
//         else if(query.name){
//             User.find({ name: query.name })
//             .then(docs => { res.json(docs) })
//             .catch(err => console.log(`Error getting User from db: ${err}`));
//         }
//     },
//     getUser(req, res) {
//         User.findOne({ id: req.params.id })
//         .then(docs => { res.json(docs) })
//         .catch(err => console.log(`Error getting User from db: ${err}`));

//     },
//     addUser(req, res) {
//         const {body} = req;
//         const newUser = new User(body);
//         const result = newUser.save();
//         if (result) {
//             res.json(newUser)
//         } else {
//             res.status(404).send("Error saving a User");
//         }
//     },
//     deleteUser(req, res) {
//         User.deleteOne({ id: req.params.id } ) 
//             .then(docs => { res.json(docs) })
//             .catch(err => console.log(`Error deleting User from db: ${err}`));
//     },
//     updateUser(req, res) {
//         const {body} = req;
//         User.updateOne({ id: req.params.id } , body ) 
//             .then(docs => { res.json(docs) })
//             .catch(err => console.log(`Error updating User from db: ${err}`));
//     },
// }