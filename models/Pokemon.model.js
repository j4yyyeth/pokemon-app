const { Schema, model } = require('mongoose');

const pokemonSchema = new Schema (
  {
    name: String,
    image: String,
  },
);

module.exports = model('Pokemon', pokemonSchema);