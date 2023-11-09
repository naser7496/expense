const express = require('express');
const router = express.Router();
const passport = require('passport');



//google oauth2.0 login route
router.get('/google',
    passport.authenticate('google',{scope:['profile','email']})
    );

//google oauth2.0 callback route
router.get('/google/callback',
passport.authenticate('google',{failureRedirect:'/'}),
    (req, res) => {
        // Successful authentication, redirect to a secure route.
        res.redirect('/profile');
});


router.get('/logout',(req, res)=>{
    req.logOut((err)=>{
        if(err){
            console.error(err);
        }
        res.redirect('/');
    });  
});

module.exports=router;
