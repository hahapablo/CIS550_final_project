const express = require('express');
const mysql = require('mysql');
var cors = require('cors')

const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);


const CONNECTION_URL = 'mongodb+srv://cis550:cis5502022@cluster0.n6knc.mongodb.net/?retryWrites=true&w=majority';



// Route 1 - register as GET 
app.get('/song', routes.getAllSongs)

// Route 2 - register as GET 
app.get('/search_by_content', routes.getSongsSearchByContent)

// Route 3 - register as GET 
app.get('/search_by_content_and_range', routes.getSongsSearchByContentAndRange)

// Route 4 - register as GET 
app.get('/search_by_content_and_range_and_rank', routes.getSongsSearchByContentAndRangeAndRank)


// Route 5 - register as GET 
app.get('/search_song_info', routes.getSongsSearchByContentAndRangeAndRank)


module.exports = app;
