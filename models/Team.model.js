const {Schema, model} = require('mongoose');

const teamSchema = new Schema (
    {
        pokemon1: { type: Schema.Types.ObjectId, ref: "Pokemon" },
        pokemon2: { type: Schema.Types.ObjectId, ref: "Pokemon" },
        pokemon3: { type: Schema.Types.ObjectId, ref: "Pokemon" },
        teamName: String,
        trainer: { type: Schema.Types.ObjectId, ref: "User" },
    }
);


module.exports = model('Team', teamSchema);