const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  signin(req, res) {
    res.render('auth/signin');
  },

  signup(req, res) {
    res.render('auth/signup');
  },

  async register(req, res, next) {
    try {
      const { email } = req.body;

      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'E-mail já cadastrado');
        return res.redirect('back');
      }

      const password = await bcrypt.hash(req.body.password, 5);
      await User.create({ ...req.body, password });

      req.flash('success', 'Usuário cadastrado com sucesso');
      return res.redirect('/');
    } catch (error) {
      return next(error);
    }
  },

  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash('error', 'Usuário inexistente');
        return res.redirect('back');
      }

      if (!await bcrypt.compare(password, user.password)) {
        req.flash('error', 'Senha incorreta');
        return res.redirect('back');
      }

      req.session.user = user;

      return req.session.save(() => {
        res.redirect('app/dashboard');
      });
    } catch (error) {
      return next(error);
    }
  },

  signout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
