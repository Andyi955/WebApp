'use strict';

// import all required modules
const logger = require('../utils/logger');
const menu = require('../models/game-menu.js');

// create start object
const index = {
  
  
 
  // index method - responsible for creating and rendering the view
  index(request, response) {

  
    logger.info('start rendering');

    const date = new Date();

      const mygenres = menu.getAllGenres();
      let numGenres = mygenres.length;
      let numGames = 0;
      
      for (let i in mygenres) {
        numGames = numGames + mygenres[i].games.length;             
       
      }
  

     

    
      
      const viewData = {
        title: 'Welcome to the Game App!',
        allGenres:numGenres,
        totalGames: numGames,
        date: date
      };

      response.render('index', viewData);
    }
  };


// export the start module
module.exports = index;