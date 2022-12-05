const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect();

async function getAllSongs(req, res) {
  connection.query(`
  select
    title, 
    artists, 
    album, 
    acousticness, 
    danceability, 
    energy, 
    release_date,
    duration_ms
  from Songs
  `, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  }
  )
}


async function getSongsSearchByContent(req, res) {
  const searchBy = req.query.SearchBy
  const input = req.query.SearchContent
  console.log(searchBy)
  console.log(input)

  //TODO split into 4 search type
  if (searchBy === "all" || searchBy === "") {
    connection.query(`
      SELECT title, artists, album, acousticness, danceability, energy, release_date, duration_ms
      FROM Songs
      WHERE title LIKE '%${input}%' OR album LIKE '%${input}%' OR artists LIKE '%${input}%'`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "song") {
    connection.query(`
      select title, artists, album, acousticness, danceability, energy, release_date, duration_ms
      from Songs
      where title like '%${input}%'`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "album") {
    connection.query(`
    select title, artists, album, acousticness, danceability, energy, release_date, duration_ms
    from Songs
    where album like '%${input}%'`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "artist") {
    connection.query(`
    select title, artists, album, acousticness, danceability, energy, release_date, duration_ms
    from Songs
    where artists like '%${input}%'`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "lyrics") {
    connection.query(`
      SELECT d1.title, d1.artists, d1.album, d1.acousticness, d1.danceability, d1.energy, d1.release_date, d1.duration_ms
      FROM Songs d1
      INNER JOIN (
        SELECT title, artists, year
        FROM Lyrics
        WHERE lyrics LIKE '%${input}%') d2
      ON d1.title = d2.title
      AND d1.artists = d2.artists
      AND d1.year = d2.year;`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "genre") {
    connection.query(`
      SELECT d1.title, d1.artists, d1.album, d1.acousticness, d1.danceability, d1.energy, d1.release_date, d1.duration_ms
      FROM Songs d1
      JOIN Lyrics d2
      ON d1.title = d2.title
      AND d1.artists = d2.artists
      AND d1.year = d2.year
      WHERE d2.tag LIKE '${input}';`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  }
}

async function getSongsSearchByContentAndRange(req, res) {
  const searchBy = req.query.SearchBy
  const input = req.query.SearchContent
  const acLow = req.query.AccousticnessLow
  const acHigh = req.query.AccousticnessHigh
  const daLow = req.query.DanceabilityLow
  const daHigh = req.query.DanceabilityHigh
  const enLow = req.query.EnergyLow
  const enHigh = req.query.EnergyHigh
  console.log(searchBy, input, acLow, acHigh, daLow, daHigh, enLow, enHigh)

  //TODO split into 4 search type
  if (searchBy === "all" || searchBy === "") {
    connection.query(`
      SELECT title, artists, album, acousticness, danceability, energy, release_date, duration_ms
      FROM Songs
      WHERE title LIKE '%${input}%' OR album LIKE '%${input}%' OR artists LIKE '%${input}%'
        AND acousticness between ${acLow} and ${acHigh}
        AND danceability between ${daLow} and ${daHigh}
        AND energy between ${enLow} and ${enHigh}
    `,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "song") {
    connection.query(`
      select title, artists, album, acousticness, danceability, energy, release_date, duration_ms
      from Songs
      where title like '%${input}%'
      AND acousticness between ${acLow} and ${acHigh}
      AND danceability between ${daLow} and ${daHigh}
      AND energy between ${enLow} and ${enHigh}`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "album") {
    connection.query(`
    select title, artists, album, acousticness, danceability, energy, release_date, duration_ms
    from Songs
    where album like '%${input}%'
    AND acousticness between ${acLow} and ${acHigh}
    AND danceability between ${daLow} and ${daHigh}
    AND energy between ${enLow} and ${enHigh}`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "artist") {
    connection.query(`
    select title, artists, album, acousticness, danceability, energy, release_date, duration_ms
    from Songs
    where artists like '%${input}%'
    AND acousticness between ${acLow} and ${acHigh}
    AND danceability between ${daLow} and ${daHigh}
    AND energy between ${enLow} and ${enHigh}`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  }
}

async function getSongsSearchByContentAndRangeAndRank(req, res) {
  const searchBy = req.query.SearchBy
  const input = req.query.SearchContent
  const acLow = req.query.AccousticnessLow
  const acHigh = req.query.AccousticnessHigh
  const daLow = req.query.DanceabilityLow
  const daHigh = req.query.DanceabilityHigh
  const enLow = req.query.EnergyLow
  const enHigh = req.query.EnergyHigh
  const rank = req.query.Rank
  console.log(searchBy, input, acLow, acHigh, daLow, daHigh, enLow, enHigh)

  //TODO split into 4 search type
  if (searchBy === "all" || searchBy === "") {
    connection.query(`
      SELECT title, artists, album, acousticness, danceability, energy, release_date, duration_ms
      FROM Songs
      WHERE title LIKE '%${input}%' OR album LIKE '%${input}%' OR artists LIKE '%${input}%'
        AND acousticness between ${acLow} and ${acHigh}
        AND danceability between ${daLow} and ${daHigh}
        AND energy between ${enLow} and ${enHigh}
      order by ${rank}
    `,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "song") {
    connection.query(`
      select title, artists, album, acousticness, danceability, energy, release_date, duration_ms
      from Songs
      where title like '%${input}%'
      AND acousticness between ${acLow} and ${acHigh}
      AND danceability between ${daLow} and ${daHigh}
      AND energy between ${enLow} and ${enHigh}
      order by ${rank}`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "album") {
    connection.query(`
    select title, artists, album, acousticness, danceability, energy, release_date, duration_ms
    from Songs
    where album like '%${input}%'
    AND acousticness between ${acLow} and ${acHigh}
    AND danceability between ${daLow} and ${daHigh}
    AND energy between ${enLow} and ${enHigh}
    order by ${rank}`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  } else if (searchBy === "artist") {
    connection.query(`
    select title, artists, album, acousticness, danceability, energy, release_date, duration_ms
    from Songs
    where artists like '%${input}%'
    AND acousticness between ${acLow} and ${acHigh}
    AND danceability between ${daLow} and ${daHigh}
    AND energy between ${enLow} and ${enHigh}
    order by ${rank}`,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          res.json({ results: results })
        }
      }
    )
  }
}

async function getSongInfo(req, res) {
  console.log("getSongInfo")
  const title = req.query.Title
  const artist = req.query.Artist
  const year = req.query.Year
  console.log(title)
  console.log(artist)
  console.log(year)

  connection.query(`
    SELECT d1.title Title, d1.artists Artists, d1.album Album, d2.lyrics
    FROM Songs d1
    JOIN Lyrics d2
    ON d1.title = d2.title
    AND d1.artists = d2.artists
    AND d1.year = d2.year
    WHERE d1.title = ${title}
    AND d1.artists = ${artist}
    AND d1.year = ${year};
  `, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  }
  )
}

module.exports = {
  getAllSongs,
  getSongsSearchByContent,
  getSongsSearchByContentAndRange,
  getSongsSearchByContentAndRangeAndRank,
  getSongInfo,
}
