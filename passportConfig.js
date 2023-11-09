const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('./models/User');


passport.use(new GoogleStrategy({
clientID:process.env.CLIENT_ID,
clientSecret:process.env.CLIENT_SECRET,
callbackURL:'http://localhost:3000/auth/google/callback'
},
async (accessToken,refreshToken,profile,done)=>{
    try{
     //check if user already exists in your database
     const existingUser = await User.findOne({googleId:profile.id});
     
     if(existingUser){
          //user already exists so update it's information as needed
          
          return done(null,existingUser);
     }

      // User doesn't exist, create a new user in your database
      const newUser = new User({
          googleId:profile.id,
      });

      await newUser.save();


      done(null,newUser);

    }catch (error) {
      done(error, null);
   }
}));


//serialize user for session
passport.serializeUser((user,done)=>{
     done(null,user);
});

//deserialize user from session
passport.deserializeUser((user,done)=>{
     done(null,user);
});

module.exports =passport;