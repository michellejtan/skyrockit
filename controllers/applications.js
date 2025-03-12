const express = require('express');
const router = express.Router();

const User = require('../models/user.js');  //isn't this for application, so why require model? we have deal with parent, accessing submodel 

// GET /users/:userId/applications
router.get('/', (req, res) => { // the forward slash "/" indicating anything after "application" in path
    try {
        res.render('applications/index.ejs');
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }  });
  
module.exports = router;