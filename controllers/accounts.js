'use strict';

const userlist = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('genre', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
        user.picture = request.files.picture;
    logger.info('registering ${user.email}');

    userlist.addUser(user, function(){
    response.redirect('/login');
    });
  },

  authenticate(request, response) {
    const user = userlist.getUserByEmail(request.body.email);
    if (user && request.body.password === user.password) {
      response.cookie('genre', user.email);
      logger.info('logging in' + user.email);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser (request) {
    const userEmail = request.cookies.genre;
    return userlist.getUserByEmail(userEmail);
  }
}

module.exports = accounts;