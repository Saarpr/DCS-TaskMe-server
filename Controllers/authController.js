const User = require('../Models/user');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library');
const client = new OAuth2Client(process.env.G_ID);
// mailgun
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
// jason web token
const jwt = require('jsonwebtoken');
const { json } = require('express');
const bcrypt = require('bcrypt');


exports.authController = {
    signUp(req, res) {
        const { name, email, password } = req.body;
        console.log(name , email , password);
        User.findOne({ email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({ error: "User with this email already exists." })
            }
            const token = jwt.sign({ name, email, password }, process.env.JWT_TOKEN_ACTIVATE, { expiresIn: '30m' });
            const data = {
                from: 'noreply@TaskMe.com',
                to: email,
                subject: 'TaskMe account activation Link',
                html: `
                    <h2>Click to activate your account</h2>
                    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>        
                `
            };    // important!! **** we need to change the url to the real client confirmation page (in react) *****

            mg.messages().send(data, function (error, body) {
                if (error) {
                    return res.json({
                        error: error
                    })
                }
                return res.json({
                    message: 'Email has been sent, please activate your account'
                })
            });

        })
    },

    activateAccount(req, res) {
        const { token } = req.body; //maybe get by headers
        if (token) {
            jwt.verify(token, process.env.JWT_TOKEN_ACTIVATE, function (err, decodedToken) {
                if (err) {
                    res.status(400).json({ error: "Incorrect or Expired link!" })
                }
                const { name, email, password, picture } = decodedToken;
                // **add avatar to none google users 
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        return res.status(400).json({ error: "User with this email already exists." })
                    }
                    let newUser = new User({ name, email, password, picture });
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
            if (!user) {      
                return res.status(401).json({
                    error: "This user does not exist, signup first!"
                })
            }
            bcrypt.compare(password, user.password , function(err, result) {
                if(err)
                    return res.status(401).json({
                        error: "Email or password incorrect!"
                    })
                if(result){
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '3h' });
                    const { name, email, picture } = user;
                    res.json({
                        token,
                        user: { name, email, picture }
                    })
                }
                else {
                    return res.status(401).json({
                        error: "Email or password incorrect!"
                    })
                }
                // result == true
            });
            // if (user.password !== password) {
            //     return res.status(401).json({
            //         error: "Email or password incorrect!"
            //     })
            // }

        })
    },

    googleLogin(req, res) {
        const { tokenId } = req.body;
        client.verifyIdToken({ idToken: tokenId, audience: process.env.G_ID }).then(response => {
            const { email_verified, name, email , picture } = response.payload;
            // console.log(response.payload);
            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (err) {
                        return res.status(400).json({
                            error: "something went wrong!"
                        })
                    } else {
                        if (user) {
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '3h' });
                            const { _id, name, email, picture } = user;

                            res.json({
                                token,
                                user: { _id, name, email, picture }
                            })
                        } else {
                            let password = email+process.env.JWT_SIGNIN_KEY;
                            let newUser = User({name , email , password , picture});
                            newUser.save((err, data) => {
                                if(err) {
                                    return res.status(400).json({
                                        error: "something went wrong"
                                    })
                                }
                                const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '3h' });
                                const { name, email, picture } = newUser;
                                res.json({
                                    token,
                                    user: { name, email, picture }
                                })
                            })
                        }
                    }
                })
            }
        })
    }
}


