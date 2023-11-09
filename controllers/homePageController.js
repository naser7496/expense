
const Expense = require('../models/Expense');
const User = require('../models/User');
const Profile = require('../models/Profile');



exports.homePage = async (req, res) => { 
  res.render('home',{isAuthenticated: res.locals.isAuthenticated, isProfilePage: false});
}


exports.prfilePage = async (req, res) => {
  const profile = await Profile.findOne(req.user.googleId);
  const name = profile.name;
  const email = profile.email;
  const phoneNumber = profile.phoneNumber;
 const user = req.user
  
  res.render('profile',
  {
    user,
    name,
    email,
    phoneNumber,
    isAuthenticated: res.locals.isAuthenticated,
    isHomePage: res.locals.isHomePage,
    isProfilePage:true
  });
} 


exports.profilePageForm = async(req, res)=>{
  // Extract form data from req.body and use it to create/update the user
  const name = req.body.name;
  const email= req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const reason = req.body.reason;

  const userId= req.body._id

  await Profile.create({name, email,phoneNumber,reason,user:userId})
  res.redirect('/profile')   
}


