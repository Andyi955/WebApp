'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const index = require ('./controllers/index.js');

const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const genre = require('./controllers/genre.js');
const about = require('./controllers/about.js');
const accounts = require ('./controllers/accounts.js');



// connect routes to controllers
router.get('/', index.index)

router.get('/start', start.index);
router.get('/index', index.index)
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/genre/:id', genre.index);
router.get('/about/:id', about.index);

router.get('/genre/:id/deleteGame/:gameid', genre.deleteGame);
router.get('/deleteGenre/:id', dashboard.deleteGenre)

router.post('/genre/:id/addgame', genre.addGame);
router.post('/dashboard/addgenre', dashboard.addGenre);
router.post('/about/addcomment', about.addComment);

router.post('/genre/:id/updategame/:gameid', genre.updateGame);




router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
// export router module
module.exports = router;


