require('dotenv').config();

const mongoose = require('mongoose');
const axios = require('axios')
// const Book = require('./models/Book.model');

const MONGO_URI = process.env.MONGODB_URI;

let pokeUrls = [

];

let pokeDetails = []

axios.get('https://pokeapi.co/api/v2/pokemon?limit=386&offset=0')
    .then((results) => {
        const arr = results.data.results
       return pokeUrls = arr.map((element) => {
            return element.url
        })
        // console.log(pokeUrls)
        // // console.log(results.data)
        // results.data.forEach((element) => {
        //     return element.url
        // })
        // console.log(results.data)
    })
    .then((urls) => {
        return Promise.all(urls.map((element) => {
           return axios.get(element) 
        }))
    })
    .then((results) => {
        return pokeDetails = results.map((element) => {
            return element.data
        })
        // console.log(pokeDetails)
    })
    .then((details) => {
        console.log(details)
    })
    .catch((err) => {
        console.log(err)
    })

// mongoose
//   .connect(MONGO_URI)
//   .then(x => {
//     console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

//     // Create new documents in the books collection
//     return Book.create(books);
//   })
//   .then(booksFromDB => {
//     console.log(`Created ${booksFromDB.length} books`);

//     // Once the documents are created, close the DB connection
//     return mongoose.connection.close();
//   })
//   .then(() => {
//     // Once the DB connection is closed, print a message
//     console.log('DB connection closed!');
//   })
//   .catch(err => {
//     console.log(`An error occurred while creating books from the DB: ${err}`);
//   });