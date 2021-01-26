const User = require('../Models/user');

// mailgun 
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
// jason web token
const jwt = require('jsonwebtoken');
const { json } = require('express');

exports.authController = {

    signUp(req, res) {
        const { name, email, password, thumbnail } = req.body;
        User.findOne({ email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({ error: "User with this email already exists." })
            }

            const token = jwt.sign({ name, email, password, thumbnail }, process.env.JWT_TOKEN_ACTIVATE, { expiresIn: '30m' });
            const data = {
                from: 'noreply@TaskMe.com',
                to: email,
                subject: 'Account activation Link',
                html: `
                    <h2>Click to activate your account</h2>
                    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>        
                `
            };          /// important!! **** we need to change the url to the real client confirmation page (in react)*****

            mg.messages().send(data, function (error, body) {
                if (error) {
                    return res.json({
                        error: err.message
                    })
                }
                return res.json({
                    message: 'Email has been sent, please activate your account'
                })
            });

        })
    },

    activateAccount(req, res) {
        const { token } = req.body;
        if (token) {
            jwt.verify(token, process.env.JWT_TOKEN_ACTIVATE, function (err, decodedToken) {
                if (err) {
                    res.status(400).json({ error: "Incorrect or Expired link!" })
                }
                const { name, email, password, thumbnail } = decodedToken;
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        return res.status(400).json({ error: "User with this email already exists." })
                    }
                    let newUser = new User({ name, email, password, thumbnail });
                    newUser.save((err, success) => {
                        if (err) {
                            console.log("Error in signup while account activation: ", err);
                            return res.status(400), json({ error: 'error activating account' })
                        }
                        res.json({
                            message: "Signup success!"
                        })
                    })
                })
            })
        } else {
            return res.json({ error: "something went wrong!" })
        }
    },

    signIn(req, res) {
        const { email, password } = req.body;
        User.findOne({ email }).exec((err, user) => {
            if (err) {                                                  /////////////////// doesnt catch the error!!!!!
                return res.status(401).json({
                    error: "This user does not exist, signup first"
                })
            }
            if (user.password !== password) {
                return res.status(401).json({
                    error: "Email or password incorrect!"
                })
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '3h' });
            const { _id, name, email, thumbnail } = user;

            res.json({
                token,
                user: { _id, name, email, thumbnail }
            })
        })
    }
}


