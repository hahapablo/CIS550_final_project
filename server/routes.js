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
      with agg_artists as (
        select s.title, s.year, group_concat(s.artist) as artists, l.lyrics
        from Songs_2 as s
        join (
            select title, artist, year, lyrics
            from Lyrics_1
            where lyrics like '%${input}%'
            ) as l
            on s.title = l.title and s.artist = l.artist and s.year = l.year
        group by s.title, s.year
      )
      select s.title, a.artists, s.album, s.acousticness, s.danceability, s.energy, s.release_date, s.duration
      from Songs_2 as s
          join agg_artists as a
              on s.title = a.title and s.year = a.year
      where a.artists like concat('%', s.artist, '%');`,
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
      with agg_artists as (
        select s.title, s.year, group_concat(s.artist) as artists, l.tag
        from Songs_2 as s
        join (
            select title, artist, year, tag
            from Lyrics_1
            where tag like '%${input}%'
            ) as l
            on s.title = l.title and s.artist = l.artist and s.year = l.year
        group by s.title, s.year
      )
      select s.title, a.artists, s.album, s.acousticness, s.danceability, s.energy, s.release_date, s.duration
      from Songs_2 as s
          join agg_artists as a
              on s.title = a.title and s.year = a.year
      where a.artists like concat('%', s.artist, '%');`,
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
      WHERE (title LIKE '%${input}%' OR album LIKE '%${input}%' OR artists LIKE '%${input}%')
        AND acousticness between ${acLow} and ${acHigh}
        AND danceability between ${daLow} and ${daHigh}
        AND energy between ${enLow} and ${enHigh}
    `,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          console.log("search2=", results)
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
  const acLow = req.query.AccousticnessLow ? req.query.AccousticnessLow : 0
  const acHigh = req.query.AccousticnessHigh ? req.query.AccousticnessHigh : 1
  const daLow = req.query.DanceabilityLow ? req.query.DanceabilityLow : 0
  const daHigh = req.query.DanceabilityHigh ? req.query.DanceabilityHigh : 1
  const enLow = req.query.EnergyLow ? req.query.EnergyLow : 0
  const enHigh = req.query.EnergyHigh ? req.query.EnergyHigh : 1
  const rank = req.query.Rank
  console.log(searchBy, input, acLow, acHigh, daLow, daHigh, enLow, enHigh)

  //TODO split into 4 search type
  if (searchBy === "all" || searchBy === "") {
    connection.query(`
      SELECT title, artists, album, acousticness, danceability, energy, release_date, duration_ms
      FROM Songs
      WHERE (title LIKE '%${input}%' OR album LIKE '%${input}%' OR artists LIKE '%${input}%')
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
          console.log(results)
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

  console.log(title)
  console.log(artist)


  connection.query(`
    with agg_artists as (
      select s.title, s.year, group_concat(s.artist) as artists, l.lyrics
      from Songs_2 as s
      join (
          select title, artist, year, lyrics
          from Lyrics_1
          ) as l
          on s.title = l.title and s.artist = l.artist and s.year = l.year
      group by s.title, s.year
    )
    select s.title, a.artists, s.year, a.lyrics, c.cover_idx, s.album
    from Songs_2 as s
        join agg_artists as a
            on s.title = a.title and s.year = a.year
        join AlbumCovers_1 as c
            on lower(s.album) = lower(c.album_name)
    where a.artists like concat('%', s.artist, '%')
    and s.title like '%${title}%'
    and a.artists like '%${artist}%';
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
  getSongInfo
}


