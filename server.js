const express = require("express");
const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5500;
const passportSetup = require("./config/passport-setup");
const { authRouter } = require("./Routers/auth-routh");
// const { profileRouter } = require("./Routers/profile-routh");
const { taskRouter } = require("./Routers/task-route");

const consts = require('./constants');
const {  COOKIEKEY } = consts;
const cors = require('cors');
// const { morganChalk , logger } = require("./logs");
//
// app.use(morganChalk);
// app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cookieSession({
    maxAge:10*60*1000,
    keys:[COOKIEKEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
// app.use('/profile', profileRouter);
app.use('/api/tasks', taskRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});


app.listen(port, () => console.log('Express server is running on port ', port));