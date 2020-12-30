const profileRouter = require('express').Router();
const authCheck = (req,res,next)=>{
    if(!req.user){
        res.redirect('/auth/logout');
    }
    else{
        next();
    }
};


profileRouter.get('/', authCheck, (req, res) => {
    // res.render('profile', { user: req.user });

});


profileRouter.get('/user', authCheck, (req, res) => {
    console.log("Hi",req.user);
    
    res.send(req.user);    
});

module.exports = {profileRouter}; 