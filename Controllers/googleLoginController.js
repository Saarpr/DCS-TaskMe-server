const {OAuth2Client, UserRefreshClient} = require('google-auth-library');
const client = new OAuth2Client("797191547152-h2lf9jrigv5bmc3rv4cic2ph3vr42m45.apps.googleusercontent.com")


exports.googleLoginController = {
    googleLogin(req,res){
        const {tokenId} = req.body;
        client.verifyIdToken({idToken: tokenId , audience: "797191547152-h2lf9jrigv5bmc3rv4cic2ph3vr42m45.apps.googleusercontent.com"}).then(response => {
            const {email_verified , name , email} = response.payload;
            console.log(response.payload);
            if(email_verified){ // we can change it to google id and check if he exist in out DB
                // User.findOne... and handle create/ error
            }
        })
    }
}
