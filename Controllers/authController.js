const User = require('../Models/user');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library');
const client = new OAuth2Client(process.env.G_ID);
// mailgun
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
// json web token
const jwt = require('jsonwebtoken');
const { json } = require('express');
const bcrypt = require('bcrypt');


exports.authController = {
    signUp(req, res) {
        const { name, email, password } = req.body;
        User.findOne({ email }).exec((err, user) => {
            if (user) {
                return res.status(400).json({ error: "User with this email already exists." });
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
        console.log("activating:" , token )
        if (token) {
            jwt.verify(token, process.env.JWT_TOKEN_ACTIVATE, function (err, decodedToken) {
                if (!decodedToken) {
                    res.status(400).json({ error: "Incorrect or Expired link!" })
                }
                const { name, email, password } = decodedToken;
                console.log("name:" , name )
                console.log("email:" , email )
                console.log("password:" , password )
                var tmpPassword;
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password , salt, function (error, hash) {
                        if (err){
                            return console.log(error);
                        }
                        tmpPassword = hash;
                    });
                });
                console.log("tmpPassword:" , tmpPassword )

                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        return res.status(400).json({ error: "User with this email already exists." })
                    }
                    let newUser = new User({ name, email, password: tmpPassword });
                    newUser.save((err, success) => {
                        if (err) {
                            console.log("Error in signup while account activation: ", err);
                            return res.status(400), json({ error: 'error activating account' });
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
        User.findOne({ email:email }).exec((err, user) => {
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
                    req.session.user = { name, email, picture };
                    res.json({token, user: { name, email, picture }
                    })
                }
                else {
                    return res.status(401).json({
                        error: "Email or password incorrect!"
                    })
                }
            });


        })
    },
    checkAuth(req,res){
        if(req.session.user){
            res.send({loggedIn: true , user: req.session.user})
        }else{
            res.send({loggedIn: false})
        }
    },
    logout(req,res){
        if(req.session.user){
            req.session.destroy();
            res.send({loggedIn: false});
        }else{
            res.send({loggedIn: false});
        }
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
                            //creat session here
                            const { _id, name, email, picture } = user;
                            req.session.user = { name, email, picture };
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
                                req.session.user = { name, email, picture };
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


