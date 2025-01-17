const config = require('config');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('./passport');
const routes = require('./../routes');

module.exports = (app) => {
  // Этот инструмент помогает убедится в том, что кука не была изменена на клиента
  app.keys = [config.get('session.secret')];
  app.use(session(app));
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(routes.middleware())
};
