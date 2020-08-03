'use strict';

const JsonStore = require('./json-store');


const gameDev = {

  store: new JsonStore('./models/game-developer.json', { gamedevs: [] }),
  collection: 'gamedevs',

  
  
  getAllGameDevs(){
    return this.store.findAll(this.collection);
  },
  
  
  addComment(comment) {
    this.storecomments.add(this.collection, comment);
  },

};
module.exports = gameDev;