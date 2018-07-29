const express = require('express');
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', authController.signin);
routes.get('/signup', authController.signup);
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);
module.exports = routes;
