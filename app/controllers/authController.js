// const { User } = require('../models');

module.exports = {
  signin(req, res) {
    res.render('auth/signin');
  },

  signup(req, res) {
    res.render('auth/signup');
  },
};
