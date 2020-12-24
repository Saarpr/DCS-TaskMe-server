const express = require("express");
const passport = require('passport');
var cookieSession = require('cookie-session');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const passportSetup = require("./config/passport-setup");
const { userRouter } = require("./Routers/userRouter");
const { taskRouter } = require("./Routers/taskRouter");
const { authRouter } = require("./Routers/auth-routh");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set("views", "../client"); 

/////////////////Login/////////////////////
app.get('/', (req, res)=> {
  res.render('home.ejs');
});

app.use('/auth',authRouter);

//////////////////////////////////////



// app.use('/api/users', userRouter);
// app.use('/api/tasks', taskRouter);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Content-Type', 'application/json');
    next();
});

/////////////////Login/////////////////////

app.use('/auth',authRouter);
  
app.get('/', (req, res)=> {
    res.render('home');
  });

//////////////////////////////////////


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on port ', port));




