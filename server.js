const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const authController = require('./controllers/auth.js');
const applicationsController = require('./controllers/applications.js');

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// passUserToView comes after session middleware but before homepage
app.use(passUserToView);

app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    res.redirect(`users/${req.session.user._id}/applications`);
  } else {
    res.render('index.js');
  }
});

app.use('/auth', authController);

app.use(isSignedIn);
// this middleware run after auth routes - the user need to authenticate first
app.use('/users/:userId/applications', applicationsController); // we need the userId

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});