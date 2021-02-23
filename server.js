const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const { authRouter } = require("./Routers/auth-routh");
const { taskRouter } = require("./Routers/task-route");
const cors = require('cors');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(cors({
    origin: ["https://taskmeds.netlify.app"],
    methods: ["GET", "POST" , "PUT" , "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    key: "userId",
    secret: process.env.COOKIEKEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 1000,
        },
    })
);

app.use('/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});


app.listen(port, () => console.log('Express server is running on port ', port));