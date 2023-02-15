require('dotenv').config();

const mongoose = require('mongoose');
const axios = require('axios')
// const Book = require('./models/Book.model');

const MONGO_URI = process.env.MONGODB_URI;
const Pokemon = require('./models/Pokemon.model');

let pokeUrls = [

];

let pokeDetails = []
let pokeFinal = [];


mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Pokemon.deleteMany()
  })
  .then((mongoResults)=>{
    console.log(mongoResults)
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=386&offset=0')
    .then((results) => {
        const arr = results.data.results
       return pokeUrls = arr.map((element) => {
            return element.url
        })
    })
  })
//   .then( async (urls) => {  
//     for await (const element of urls) {
//         return urls.map( async (element) => {
//             let response = await axios.get(element)
//             return response
//          }) 
//     }
// })
    .then( async (urls) => {
        return Promise.all(urls.map((element) => {
           return axios.get(element) 
        }))
    })
    .then((results) => {
        console.log("FOUND!!!", results)
        return pokeDetails = results.map((element) => {
            return element.data
        })
    })
    .then((details) => {
        return pokeFinal = details.map((elm)=>{
            return {name: elm.name, image: elm.sprites.front_default, order: elm.order};
        })
    })
    .then((final)=>{

        return Promise.all(final.map((elm)=>{
            return Pokemon.create({
                name: elm.name,
                image: elm.image,
                order: elm.order
            })
        }))
    })
    .then((DBresults)=>{
        console.log(DBresults);
        mongoose.connection.close(() => {
      console.log('Mongoose connection closed');
    });
    })
    .catch((err) => {
        console.log(err)
    })