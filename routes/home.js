const express = require('express');
const router = express.Router();
const methodOverride = require('method-override')
router.use(methodOverride('_method'));

const homeController = require('../controllers/homePageController');

const requireAuth = (req,res,next) => {
    if(req.isAuthenticated()) {
        return next();
  }
    res.redirect('/auth/google');
  };




router.get('/', homeController.homePage);
router.get('/profile',requireAuth, homeController.prfilePage);
router.post('/profile', requireAuth, homeController.profilePageForm)

module.exports = router;