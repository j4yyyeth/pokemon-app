const { Schema, model } = require('mongoose');

const pokemonSchema = new Schema (
  {
    name: String,
    image: String,
    order: Number
  },
);

module.exports = model('Pokemon', pokemonSchema);