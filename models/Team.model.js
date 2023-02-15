const {Schema, model} = require('mongoose');

const teamSchema = new Schema (
    {
        pokemon1: String,
        pokemon2: String,
        pokemon3: String,
        trainer: { type: Schema.Types.ObjectId, ref: "User" },
    }
);

module.exports = model('Team', teamSchema);