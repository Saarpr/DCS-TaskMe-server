const profileRouter = require('express').Router();
const authCheck = (req,res,next)=>{
    if(!req.user){
        res.status(403).send();
    }
    else{
        next();
    }
};


profileRouter.get('/', authCheck, (req, res) => {
    console.log("Hi",req.user);
    
    res.send(req.user);    
});

module.exports = {profileRouter}; 