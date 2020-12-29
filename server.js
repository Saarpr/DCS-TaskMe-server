const express = require("express");
const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5500;
const passportSetup = require("./config/passport-setup");
const { taskRouter } = require("./Routers/taskRouter");
const { authRouter } = require("./Routers/auth-routh");
const { profileRouter } = require("./Routers/profile-routh");
const consts = require('./constants');
const {  COOKIEKEY } = consts;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set("views", "./DCS-TaskMe-client/views");

app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[COOKIEKEY]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("./DCS-TaskMe-client/"));
/////////////////Login/////////////////////
app.get('/', (req, res)=> {
  res.render('home.ejs',{user: req.user});
});

app.use('/auth',authRouter);
app.use('/profile', profileRouter, express.static("./DCS-TaskMe-client"));


//////////////////////////////////////

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