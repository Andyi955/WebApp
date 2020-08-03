'use strict';

// import all required modules
const logger = require('../utils/logger');
const gameDev = require('../models/game-developer.js');
const commentStore = require('../models/comments-store.js');

const accounts = require ('./accounts.js');
const uuid = require('uuid');




// create dashboard object
const about = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request); 

    // display confirmation message in log
    logger.info('about rendering');

    if(loggedInUser){
    const viewData = {
      title: 'About Developer',
      gamedev: gameDev.getAllGameDevs(),
      rcomments: commentStore.getAllComments(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,


    };

    // render the dashboard view and pass through the data
    response.render('about', viewData);
    }
    else response.redirect('/');    

  },
  
    addComment(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      id: uuid(),
      userid: loggedInUser.id,
      comment: request.body.comment
      

    
    };
    logger.debug("Creating a new Comment " + newComment);
       commentStore.addComment(newComment);
    response.redirect('/about');
    }
};

// export the dashboard module
module.exports = about;