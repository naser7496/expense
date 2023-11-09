const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    name:String,
    phoneNumber:String,
    reason:String,
    email:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});


const Profile = mongoose.model('Profile',profileSchema);

module.exports = Profile;