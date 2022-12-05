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


import { getAllSongs, getSongsBySearch, getSongsBySearchWithRange, getSongsBySearchWithRangeAndRank, getSongInfo } from '../fetcher'

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

function SearchPage() {

  const [songList, setSongList] = useState([])
  const [searchBy, setSearchBy] = useState('')
  const [searchContent, setSearchContent] = useState('')
  const [rankBy, setRankBy] = useState('')
  const [acousticnessLow, setAcousticnessLow] = useState(0.0)
  const [acousticnessHigh, setAcousticnessHigh] = useState(1.0)
  const [danceabilityLow, setDanceabilityLow] = useState(0.0)
  const [danceabilityHigh, setDanceabilityHigh] = useState(1.0)
  const [energyLow, setEnergyLow] = useState(0.0)
  const [energyHigh, setEnergyHigh] = useState(1.0)
  const [rankOrder, setRankOrder] = useState("DESC")

  const handleOnChangeSearchContent = (e) => {
    console.log("searchContent = ", e.target.value)
    setSearchContent(e.target.value);
  };

  const handleOnChangeSearchBy = (e) => {
    console.log('radio checked', e.target.value);
    setSearchBy(e.target.value);
  };

  const handleOnChangeRankBy = (e) => {
    console.log('radio checked', e.target.value);
    setRankBy(e.target.value);
  };

  const handleOnChangeRankByOrder = (e) => {
    console.log('radio checked', e.target.value);
    setRankOrder(e.target.value);
  };

  const handleOnChangeAcousticnessLow = (value) => {
    setAcousticnessLow(value);
  };

  const handleOnChangeAcousticnessHigh = (value) => {
    setAcousticnessHigh(value);
  };

  const handleOnChangeDanceabilityLow = (value) => {
    setDanceabilityLow(value);
  };

  const handleOnChangeDanceabilityHigh = (value) => {
    setDanceabilityHigh(value);
  };

  const handleOnChangeEnergyLow = (value) => {
    setEnergyLow(value);
  };

  const handleOnChangeEnergyHigh = (value) => {
    setEnergyHigh(value);
  };

  const handleSubmitSearch1 = async() => {
    const search1Result = await getSongsBySearch(searchBy, searchContent)
    console.log("search1Result=", search1Result)
    setSongList(search1Result.results);
  };
  
  const handleSubmitSearch2 = async() => {
    const search2Result = 
      await getSongsBySearchWithRange(searchBy, searchContent, acousticnessLow, acousticnessHigh, danceabilityLow, danceabilityHigh, energyLow, energyHigh)
    console.log("search2Result=", search2Result)
    setSongList(search2Result.results);
  };

  const handleSubmitApply = async() => {
    const search3Result = 
      await getSongsBySearchWithRangeAndRank(searchBy, searchContent, acousticnessLow, acousticnessHigh, danceabilityLow, danceabilityHigh, energyLow, energyHigh, rankBy, rankOrder)
    console.log("search3Result=", search3Result)
    setSongList(search3Result.results);
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
          <Col span={2}  offset={0}>
           <Text>Search By </Text> 
          </Col>

          <Col span={11}  offset={0} >         
            <Radio.Group style={{display:"flex", justifyContent:"start"}} onChange={handleOnChangeSearchBy} value={searchBy}>
              <Radio value="all"> All </Radio>
              <Radio value="song"> Song </Radio>
              <Radio value="album"> Album </Radio>
              <Radio value="artist"> Artist </Radio>
              <Radio value="lyrics"> Lyrics </Radio>
              <Radio value="genre"> Genre </Radio>
            </Radio.Group> 
          </Col>
          <Col span={8}  offset={0} >  
            <Input placeholder='search input' value={searchContent} onChange={handleOnChangeSearchContent}/>
          </Col>
          <Col span={2} offset={1} style={{display: "flex",justifyContent:"center", alignItems: "center"}}> 
            <Button onClick={handleSubmitSearch1}>Search</Button> 
          </Col>

        </Row>

        <Row justify="space-around" style={{paddingTop:"10px"}}>
          <Col span={2}  offset={0}>
            <Text>Filter By </Text> 
          </Col>

          <Col span={19}  offset={0} style={{display:"flex", justifyContent:"space-around"}}>
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>Accousticness</Text>
              <InputNumber value={acousticnessLow}  defaultValue="1" min="0" max="1" step="0.01" onChange={handleOnChangeAcousticnessLow} />
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>~</Text>
              <InputNumber value={acousticnessHigh} defaultValue="1" min="0" max="1" step="0.01" onChange={handleOnChangeAcousticnessHigh} />
          
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>Danceability </Text>
            <InputNumber value={danceabilityLow} defaultValue="1" min="0" max="1" step="0.01" onChange={handleOnChangeDanceabilityLow}/>
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>~</Text>
            <InputNumber value={danceabilityHigh} defaultValue="1" min="0" max="1" step="0.01" onChange={handleOnChangeDanceabilityHigh}/>

            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>Energy </Text>
            <InputNumber value={energyLow} defaultValue="1" min="0" max="1" step="0.01" onChange={handleOnChangeEnergyLow}/>
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>~</Text>
            <InputNumber value={energyHigh} defaultValue="1" min="0" max="1" step="0.01" onChange={handleOnChangeEnergyHigh}/>
          </Col>

          <Col span={2} offset={1} style={{display: "flex",justifyContent:"center", alignItems: "center"}} > 
            <Button onClick={handleSubmitSearch2}>Search</Button> 
          </Col>

        </Row>

        <Row justify="space-around" style={{paddingTop:"10px"}}>
          <Col span={2}  offset={0}>
            <Text>Rank By </Text> 
          </Col>

          <Col span={12}  offset={0}>         
            <Radio.Group style={{display:"flex",justifyContent:"start"}} value={rankBy} onChange={handleOnChangeRankBy} >
              <Radio value="acousticness"> Acousticness </Radio>
              <Radio value="danceability"> Danceability </Radio>
              <Radio value="energy"> Energy </Radio>
              <Radio value="duration"> Duration </Radio>
              <Radio value="release_date"> Release</Radio>
              <Radio value=""> Random </Radio>
            </Radio.Group> 
          </Col>
          <Col span={2}  offset={0}>
            <Text>Order By</Text> 
          </Col>
          <Col span={5}  offset={0}>         
            <Radio.Group style={{display:"flex",justifyContent:"start"}} value={rankOrder} onChange={handleOnChangeRankByOrder} >
              <Radio value="DESC"> High-to-Low </Radio>
              <Radio value="ASC"> Low-to-High </Radio>
            </Radio.Group> 
          </Col>

          <Col span={2} offset={1} style={{display: "flex",justifyContent:"center", alignItems: "center"}}> 
            <Button onClick={handleSubmitApply}>Apply</Button>
          </Col>

        </Row>

      </div>

      <Table columns={columns} dataSource={songList} style={{paddingTop:"10px"}} />


    </div>
  )
}

export default SearchPage;