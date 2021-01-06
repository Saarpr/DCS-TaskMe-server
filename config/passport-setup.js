const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/user');
const consts = require('../constants');
const { G_ID, G_SECRET } = consts;

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  });
});

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: G_ID,
    clientSecret: G_SECRET,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        done(null,currentUser);
        // do something
      } else {
        // if not, create user in our db
        new User({
          userName: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.picture
        }).save().then((newUser) => {
          done(null,newUser);
        });
      }
    });
  })
);

