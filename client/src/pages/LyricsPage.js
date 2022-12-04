/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import {useState} from "react";
import {
  Input,
  Button,
  Radio,
  InputNumber,
  Row,
  Col,
  Table,
} from 'antd';


import { getAllSongs, getSongsBySearch, getSongsBySearchWithRange, getSongsBySearchWithRangeAndRank } from '../fetcher'

import MenuBar from '../components/MenuBar';
import Text from 'antd/lib/typography/Text';

const columns = [
  {
    title: 'Song',
    dataIndex: 'title',
    key: 'song',
  },
  {
    title: 'Singer',
    dataIndex: 'artists',
    key: 'singer',
  },
  {
    title: 'Album',
    dataIndex: 'album',
    key: 'album',
  },
  {
    title: 'Acousticness',
    dataIndex: 'acousticness',
    key: 'acousticness',
  },
  {
    title: 'Danceability',
    dataIndex: 'danceability',
    key: 'danceability',
  },
  {
    title: 'Energy',
    dataIndex: 'energy',
    key: 'energy',
  },
  {
    title: 'Release Date',
    dataIndex: 'release_date',
    key: 'timeAdded',
  },
  {
    title: 'Duration',
    dataIndex: 'duration_ms',
    key: 'duration_ms',
  },
];

const data = [
  {
    key: '1',
    title: 'Taylor Swift1',
    artists: 32,
    album: 'New York No. 1 Lake Park',
    acousticness: 11,
    danceability: 11,
    energy: 10,
    release_data: 2000,
    duration: 2,
  },
];

function LyricsPage() {

  const [songList, setSongList] = useState([])
  const [searchBy, setSearchBy] = useState('')
  const [searchContent1, setSearchContent1] = useState('')
  const [searchContent2, setSearchContent2] = useState('')
  const [searchContent3, setSearchContent3] = useState('')

  const [container, setContainer] = useState(null);


  const handleOnChangeSearchContent1 = (e) => {
    console.log("searchContent = ", e.target.value)
    setSearchContent1(e.target.value);
  };

  const handleOnChangeSearchContent2 = (e) => {
    console.log("searchContent = ", e.target.value)
    setSearchContent2(e.target.value);
  };

  const handleOnChangeSearchContent3 = (e) => {
    console.log("searchContent = ", e.target.value)
    setSearchContent3(e.target.value);
  };

  const handleSubmitSearch1 = async() => {
    const search1Result = await getSongsBySearch(searchBy, searchContent1, searchContent2, searchContent3)
    console.log("search1Result=", search1Result)
    setSongList(search1Result.results);
  };
  

  useEffect(() => {
    console.log("hey")
    const func = async () => {
      try {
        const allSongs = await getAllSongs();
        console.log("allSongs = ", allSongs)
        console.log("allSongs.results = ", allSongs.results)
        setSongList(allSongs.results)
      } catch (err) {
        console.log("fetch fail")
        console.log(err);
      }
    };
    func();
  }, []);

  return ( 
    <div>
      <MenuBar />

      <div style={{paddingLeft:"10px",paddingRight:"10px"}}>
        <Row justify="space-around" style={{paddingTop:"10px"}}>
          <Col span={12}>
            <Row justify="space-around">
              <div>
                <a href="search">
                  <img src="https://source.unsplash.com/random/" alt="crypto" style = {{ maxWidth:'100%', maxHeigh:'100%'}}>
                  </img>
                </a>
              </div>
            </Row>
            <Row justify="space-around">
              Song info
            </Row>

          </Col>
          <Col span={12} style={{overflow:'auto', height:'300px'}}>
            lyrics
            lyrics
            lyrics
            lyrics
            lyrics
            lyrics
            lyrics
            lyrics
            lyrics
            lyrics
            lyrics
            lyrics

          </Col>
        </Row>

      </div>

    </div>
  )
}

export default LyricsPage;