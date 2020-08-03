'use strict';

const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const _ = require('lodash');
const JsonStore = require('./json-store');

const gameMenu = {

  store: new JsonStore('./models/game-menu.json', { gameCollection: [] }),
  collection: 'gameCollection',

  getAllGenres() {
    return this.store.findAll(this.collection);
  },

  getGenre(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addGenre(genre, response) {
    genre.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            genre.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, genre);
  },

  removeGenre(id) {
    const genre = this.getGenre(id);
    this.store.remove(this.collection, genre);
  },

  removeAllGenre() {
    this.store.removeAll(this.collection);
  },

  addGame(id, game) {
    const genre = this.getGenre(id);
    genre.games.push(game);
  },

  removeGame(id, gameId) {
    const genre = this.getGenre(id);
    const games = genre.games;
    _.remove(games, { id: gameId});
  },
  
    
  editGame(id, gameId, updatedGame) {
    const genre = this.getGenre(id);
    const games = genre.games;
    const index = games.findIndex(game => game.id === gameId);
    games[index].title = updatedGame.title;
    games[index].multiplayer = updatedGame.multiplayer;
    games[index].price = updatedGame.price;
  },
  
  
    getUserGenres(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
   getUserGames(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  getGenreDescription(description){
    return this.store.findby(this.collection,{description: description});
  }  
  
};

module.exports = gameMenu;