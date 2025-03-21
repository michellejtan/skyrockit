const express = require('express');
const router = express.Router();

const User = require('../models/user.js');  //isn't this for application, so why require model? we have deal with parent, accessing submodel 

// GET /users/:userId/applications
router.get('/', async (req, res) => { // the forward slash "/" indicating anything after "application" in path
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        // Render index.ejs, passing in all of the current user's
        // applications as data in the context object.
        res.render('applications/index.ejs', {
            applications: currentUser.applications,
        });
    } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
    }
});

// GET /users/:userId/applications/new
router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});

//POST /users/:userID/applications
router.post('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Push req.body (the new form data object) to the
      // applications array of the current user
      currentUser.applications.push(req.body);
      // Save changes to the user
      await currentUser.save();
      // Redirect back to the applications index view
      res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });
  
module.exports = router;