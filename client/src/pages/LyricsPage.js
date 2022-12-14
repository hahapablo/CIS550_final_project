/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import {useState} from "react";
import {
  Input,
  Button,
  Row,
  Col,
} from 'antd';

import { getSongInfo } from '../fetcher'

import MenuBar from '../components/MenuBar';
import Text from 'antd/lib/typography/Text';

function LyricsPage() {

  const [searchContent1, setSearchContent1] = useState('')
  const [searchContent2, setSearchContent2] = useState('')
  const [searchContent3, setSearchContent3] = useState('')

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
    console.log("searchContent1", searchContent1)
    console.log("searchContent2", searchContent2)
    console.log("searchContent3", searchContent3)
    const search1Result = await getSongInfo(searchContent1, searchContent2, searchContent3)
    console.log("search1Result=", search1Result)
    //setSongList(search1Result.results);
  };
  

  useEffect(() => {
    console.log("hey")
    const func = async () => {
      try {

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
          <Col span={1}  offset={0}>
           <Text>Song</Text> 
          </Col>
          <Col span={5}  offset={0} >  
              <Input placeholder='search input' value={searchContent1} onChange={handleOnChangeSearchContent1}/>
          </Col>

          <Col span={1}  offset={1}>
           <Text>Artist</Text> 
          </Col>
          <Col span={5}  offset={0} >
              <Input placeholder='search input' value={searchContent2} onChange={handleOnChangeSearchContent2}/>
          </Col>

          <Col span={1}  offset={1}>
           <Text>Year</Text> 
          </Col>
          <Col span={5}  offset={0} >
              <Input placeholder='search input' value={searchContent3} onChange={handleOnChangeSearchContent3}/>
          </Col>

          <Col span={3} offset={1} style={{display: "flex",justifyContent:"center", alignItems: "center"}}> 
            <Button onClick={handleSubmitSearch1}>Search</Button> 
          </Col>
        </Row>


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