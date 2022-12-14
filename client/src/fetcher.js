import config from './config.json'

const getAllSongs = async () => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/song`, {
      method: 'GET',
  })
  return res.json()
}

const getSongsBySearch = async(searchBy, searchContent) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/search_by_content?SearchBy=${searchBy}&SearchContent=${searchContent}`, {
    method: 'GET',
  })
  return res.json()
}

const getSongsBySearchWithRange = async(searchBy, searchContent, acLow, acHigh, daLow, daHigh, enLow, enHigh) => {
  console.log(searchBy, searchContent, acLow, acHigh, daLow, daHigh, enLow, enHigh)
  var res = await fetch(`http://${config.server_host}:${config.server_port}/search_by_content_and_range?SearchBy=${searchBy}&SearchContent=${searchContent}&AccousticnessLow=${acLow}&AccousticnessHigh=${acHigh}&DanceabilityLow=${daLow}&DanceabilityHigh=${daHigh}&EnergyLow=${enLow}&EnergyHigh=${enHigh}`, {
    method: 'GET',
  })
  return res.json()
}


const getSongsBySearchWithRangeAndRank = async(searchBy, searchContent, acLow, acHigh, daLow, daHigh, enLow, enHigh, rank, rankOrder) => {
  console.log(searchBy, searchContent, acLow, acHigh, daLow, daHigh, enLow, enHigh, rank, rankOrder)
  rank = rank + " " + rankOrder
  var res = await fetch(`http://${config.server_host}:${config.server_port}/search_by_content_and_range_and_rank?SearchBy=${searchBy}&SearchContent=${searchContent}&AccousticnessLow=${acLow}&AccousticnessHigh=${acHigh}&DanceabilityLow=${daLow}&DanceabilityHigh=${daHigh}&EnergyLow=${enLow}&EnergyHigh=${enHigh}&Rank=${rank}`, {
    method: 'GET',
  })
  return res.json()
}

const getSongInfo = async(title, artist) => {
  console.log(title, artist)
  var res = await fetch(`http://${config.server_host}:${config.server_port}/search_song_info?Title=${title}&Artist=${artist}`, {
    method: 'GET',
  })
  return res.json()
}

export {
    getAllSongs,
    getSongsBySearch,
    getSongsBySearchWithRange,
    getSongsBySearchWithRangeAndRank,
    getSongInfo}