const authRouter = require('express').Router();
const {authController} = require('../Controllers/authController');

authRouter.post('/signup' , authController.signUp);
authRouter.post('/email-activate' , authController.activateAccount);
authRouter.post('/sign-in' , authController.signIn);
authRouter.get('/sign-in' , authController.checkAuth);

authRouter.post('/googlelogin' , authController.googleLogin);

module.exports = {authRouter};

