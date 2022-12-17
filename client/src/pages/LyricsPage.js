/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import {useState} from "react";
import {
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider
} from 'antd';

import { getSongInfo } from '../fetcher'

import MenuBar from '../components/MenuBar';
import Text from 'antd/lib/typography/Text';

function LyricsPage() {

  // import all images
  function importAll(r) {
    return r.keys().map(r);
  }
  const images = importAll(require.context('../albums_covers/', false, /\.(png|jpe?g|svg)$/));

  //use state
  const [searchContent1, setSearchContent1] = useState('')
  const [searchContent2, setSearchContent2] = useState('')

  const [imageIndex, setImageIndex] = useState(0)
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [releaseYear, setReleaseYear] = useState()
  const [lyrics, setLyrics] = useState('')
  const [albumName, setAlbumName] = useState('')


  const handleOnChangeSearchContent1 = (e) => {
    console.log("searchContent = ", e.target.value)
    setSearchContent1(e.target.value);
  };

  const handleOnChangeSearchContent2 = (e) => {
    console.log("searchContent = ", e.target.value)
    setSearchContent2(e.target.value);
  };


  const handleSubmitSearch1 = async() => {
    console.log("searchContent1", searchContent1)
    console.log("searchContent2", searchContent2)
    const search1Result = await getSongInfo(searchContent1, searchContent2)
    const topResult=search1Result.results[0];
    setTitle(topResult.title)
    setImageIndex(topResult.cover_idx)
    setArtist(topResult.artists)
    setReleaseYear(topResult.year)
    setLyrics(topResult.lyrics)
    setAlbumName(topResult.album_name)

    console.log("search1Result=", search1Result)
    console.log("topResult=", topResult)
  };
  
  return ( 
    <div>
      <MenuBar />

      <div style={{paddingLeft:"10px",paddingRight:"10px"}}>
        <Row justify="space-around" style={{paddingTop:"10px"}}>
          <Col span={1}  offset={0}>
           <Text id="1">Song</Text> 
          </Col>
          <Col span={5}  offset={0} >  
              <Input placeholder='search input' value={searchContent1} onChange={handleOnChangeSearchContent1}/>
          </Col>

          <Col span={1}  offset={1}>
           <Text id="2">Artist</Text> 
          </Col>
          <Col span={5}  offset={0} >
              <Input placeholder='search input' value={searchContent2} onChange={handleOnChangeSearchContent2}/>
          </Col>

          <Col span={3} offset={1} style={{display: "flex", justifyContent:"center", alignItems: "center"}}> 
            <Button id="3" onClick={handleSubmitSearch1}>Search</Button> 
          </Col>
        </Row>


        <Row justify="space-around" style={{paddingTop:"10px"}}>
          <Col span={12}>
            <Row justify="space-around">
              <div style ={{overflow: 'hidden', maxHeight:'600px', width:'100%'}}>
                <img src={images[imageIndex].default} alt="crypto" style = {{ width:'100%', objectFit:'contain'}}>
                </img>
              </div>
            </Row>

          </Col>
          <Col span={12} style={{ overflow:'auto',height:'700px'}}>
            
            <Row justify="center" style={{textAlign: 'center'}}>
            <Divider />
                <div id="4">
                  Title: {title}
                  <br />
                  Artist: {artist}
                  <br />
                  Year: {releaseYear}
                  <br />
                  Album: {albumName}
                </div>
                <Divider />
            </Row>
            
            <Row style={{textAlign: 'center', whiteSpace: "pre-wrap", justifyContent:"center"}}>
              {lyrics}
            </Row>

          </Col>
        </Row>

      </div>

    </div>
  )
}

export default LyricsPage;