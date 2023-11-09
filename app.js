// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const path = require('path');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const methodOverride = require('method-override');
const passport = require('./passportConfig');
const helmet = require('helmet');
const morgan = require('morgan');
const User = require('./models/User');
const middleWare = require('./middleware')

app.use(helmet());
// app.use(morgan('combined'));

// Use the `setCSPHeader` middleware to set the CSP header
app.use(middleWare.setCSPHeader);

// Connect to MongoDB
//mongodb://127.0.0.1:27017/expense-tracker
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
});



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));



//configure session
app.use(session({
  secret: "smellycat-secret",
  saveUninitialized: true,
  resave:false,
}));


//Initialize passport
app.use(passport.initialize());
app.use(passport.session());




//Routes

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "style-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/;");

  // Other middleware and routing
  next();
});


const expenseRoutes = require('./routes/expenses');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');


const requireAuth = (req,res,next) => {
  if(req.isAuthenticated()) {
      return next();
}
  res.redirect('/auth/google');
};


app.use(middleWare.setPageVariables)
app.use('/',homeRoutes);
app.use('/auth', authRoutes);
app.use('/expenses',requireAuth,expenseRoutes);




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
