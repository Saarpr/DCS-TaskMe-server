const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const { authRouter } = require("./Routers/auth-routh");
const { taskRouter } = require("./Routers/task-route");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});


app.listen(port, () => console.log('Express server is running on port ', port));