const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    // googleId: { type: String },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 64
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    picture: { type: String },
}, { collection: 'users' });

// userSchema.pre('save', function (next) {
//     if (!this.isModified('password'))
//         return next();
//     bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(this.password , salt, function (err, hash) {
//             if (err){
//                 return next(err);
//             }
//             this.password = hash;
//             next();
//         });
//     });
// });

const User = model('User', userSchema);

module.exports = User;
