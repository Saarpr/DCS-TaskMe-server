const authRouter = require('express').Router();
const {googleLoginController} = require('../Controllers/googleLoginController');
const {authController} = require('../Controllers/authController');

authRouter.post('/signup' , authController.signUp);
authRouter.post('/email-activate' , authController.activateAccount);
authRouter.post('/sign-in' , authController.signIn);
// authRouter.put('' , authController.);

authRouter.post('/googlelogin' , googleLoginController.googleLogin);

module.exports = {authRouter};

