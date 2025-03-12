const express = require('express');
const router = express.Router();

const User = require('../models/user.js');  //isn't this for application, so why require model? we have deal with parent, accessing submodel 

module.exports = router;