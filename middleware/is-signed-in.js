const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    // if a user is signed in; call the next middleware function
    res.redirect('/auth/sign-in'); // not using it, only defining it
  };
  
  module.exports = isSignedIn;
  