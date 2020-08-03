'use strict';

// import all required modules
const logger = require('../utils/logger');
const gameMenu = require('../models/game-menu.js');
const accounts = require ('./accounts.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');

    if(loggedInUser){

      const mygenres = gameMenu.getUserGenres(loggedInUser.id);
      let numGenres = mygenres.length;
      let numGames = 0;
      let total = 0;
      
      for (let i in mygenres) {
        numGames = numGames + mygenres[i].games.length;
        
      
     
              total += numGames;
             
       
      }
    let avgGames = (total/numGames).toFixed(2);
      
        

     

      
  
      
 
      

    
    
      
      
      const viewData = {
        title: 'Welcome to the Game App!',
        myGenres:numGenres,
        totalGames: numGames,
        avgGames: avgGames,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;