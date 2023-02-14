const {Schema, model} = require('mongoose');

const teamSchema = new Schema (
    {
        team: Array,
        validate: [arrayLimit]
    }
);

console.log(arrayLimit);

function arrayLimit(val) {
    return val.length <= 3;
}

module.exports = model('Team', teamSchema);