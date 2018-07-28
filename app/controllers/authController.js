const { User } = require('../models');

module.exports = {
  signin(req, res) {
    res.render('auth/signin');
  },

  signup(req, res) {
    res.render('auth/signup');
  },

  async register(req, res) {
    const { email } = req.body;

    if (await User.findOne({ where: { email } })) {
      return res.redirect('back');
    }

    await User.create(req.body);

    return res.redirect('/');
  },
};
