'use strict';

// import all required modules
const logger = require('../utils/logger');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const gameMenu = require('../models/game-menu.js');


// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('dashboard rendering');
          const loggedInUser = accounts.getCurrentUser(request);

    if(loggedInUser){
    const viewData = {
      title: 'Video Game Review App Dashboard',
      genres: gameMenu.getUserGenres(loggedInUser.id),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
          picture: loggedInUser.picture,


    };
    
   

    // render the dashboard view and pass through the data
    response.render('dashboard', viewData);
    logger.info('about to render', viewData.genres);
    }
        else response.redirect('/');


  },
  
    deleteGenre(request, response) {
    const genreId = request.params.id;
    logger.debug(`Deleting genre ${genreId}`);
    gameMenu.removeGenre(genreId);
    response.redirect('/dashboard');
  },
     addGenre(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newGenre = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      description: request.body.description,
      picture: request.files.picture,
      date: date,

      games: []
    };
    logger.debug("Creating a new Genre" + newGenre);
    gameMenu.addGenre(newGenre, function() {
      response.redirect("/dashboard");
    });
  }
};

// export the dashboard module
module.exports = dashboard;