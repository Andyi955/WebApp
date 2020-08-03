'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const gameMenu = require('../models/game-menu.js');

const accounts = require ('./accounts.js');




const genre = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const genreId = request.params.id;
    logger.debug('Genre id = ' + genreId);
    if(loggedInUser){
    const viewData = {
      title: 'Genre',
      genre: gameMenu.getGenre(genreId),
     fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,

    };
    response.render('genre', viewData);
    }
    else response.redirect('/');

  },
  
    deleteGame(request, response) {
    const genreId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug(`Deleting Game ${gameId} from Genre ${genreId}`);
    gameMenu.removeGame(genreId, gameId);
    response.redirect('/genre/' + genreId);
  },
  
    addGame(request, response) {
    const genreId = request.params.id;
          const loggedInUser = accounts.getCurrentUser(request);

    const genre = gameMenu.getGenre(genreId);
    const newGame = {
          id: uuid(),
          userid: loggedInUser.id,

      title: request.body.title,
      multiplayer: request.body.multiplayer,
      price: request.body.price,
      
    };
    gameMenu.addGame(genreId, newGame);
    response.redirect('/genre/' + genreId);
  },
updateGame(request, response) {
    const genreId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug("updating game " + gameId);
    const updatedGame = {
      title: request.body.title,
      multiplayer: request.body.multiplayer,
     price: request.body.price
    };
    gameMenu.editGame(genreId, gameId, updatedGame);
    response.redirect('/genre/' + genreId);
  }
  
};


module.exports = genre;