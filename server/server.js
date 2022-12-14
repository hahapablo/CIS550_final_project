const express = require('express');
const mysql = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/song', routes.getAllSongs)

// Route 2 - register as GET 
app.get('/search_by_content', routes.getSongsSearchByContent)

// Route 3 - register as GET 
app.get('/search_by_content_and_range', routes.getSongsSearchByContentAndRange)

// Route 4 - register as GET 
app.get('/search_by_content_and_range_and_rank', routes.getSongsSearchByContentAndRangeAndRank)

// Route 5 - register as GET 
app.get('/search_song_info', routes.getSongInfo)


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
