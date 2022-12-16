- Before you start, we need to get OAuth Token from Spotify API (last for only 1 hour)
1. visit https://developer.spotify.com/console/get-new-releases/
2. click "get token"
3. click "request token"
4. copy OAuth Token
5. look into ./client/src/pages/HomePage.js
6. copy into: spotifyApi.setAccessToken('newToken')
note: Spotify api only allows api token to last for 1 hour - this is not something we could change, unfortunately

- How to start backend + run backend test with coverage displayed?
1. cd into ./server
2. run $npm install
3. run $npm start (Server running at http://127.0.0.1:8080/)
4. run $jest —testTimeout=10000 —coverage

- How to start frontend + run frontend component test (with cypress)?
1. cd into ./client
2. run $npm install
3. run $npm start
4. open browser and navigate to http://localhost:3000/
5. run $npx cypress open

