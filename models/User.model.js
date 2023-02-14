const {Schema, model} = require('mongoose');

const userSchema = new Schema (
    {
    email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
            },
    username: {
               type: String,
               unique: true
              },
    password: String,
    }
);

module.exports = model('User', userSchema);