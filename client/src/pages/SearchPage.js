import React, { useEffect } from 'react';
import {useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Space, Table, Tag
} from 'antd';


import { getAllSongs } from '../fetcher'


import MenuBar from '../components/MenuBar';
import Text from 'antd/lib/typography/Text';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

/**
 *     title, 
    artists, 
    album, 
    acousticness, 
    danceability, 
    energy, 
    release_data,
    duration
 */

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
    title: 'Time added',
    dataIndex: 'release_data',
    key: 'timeAdded',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
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
  const [acousticnessLow, setAcousticnessLow] = useState(0)
  const [acousticnessHigh, setAcousticnessHigh] = useState(100)
  const [danceabilityLow, setDanceabilityLow] = useState(0)
  const [danceabilityHigh, setDanceabilityHigh] = useState(100)
  const [energyLow, setEnergyLow] = useState(0)
  const [energyHigh, setEnergyHigh] = useState(100)

  const handleOnChangeSearchContent = (e) => {
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

          <Col span={6}  offset={0} >         
            <Radio.Group style={{display:"flex", justifyContent:"start"}} onChange={handleOnChangeSearchBy} value={searchBy}>
              <Radio value="all"> All </Radio>
              <Radio value="song"> Song </Radio>
              <Radio value="album"> Album </Radio>
              <Radio value="singer"> Singer </Radio>
            </Radio.Group> 
          </Col>
          <Col span={4}  offset={0} >  
            <Input placeholder='search input' value={searchContent} onChange={handleOnChangeSearchContent}/>
          </Col>
          <Col span={2} offset={1} style={{display: "flex",justifyContent:"center", alignItems: "center"}}> <Button>Search</Button> </Col>

          <Col span={9}  offset={0} >  
          </Col>
        </Row>

        <Row justify="space-around" style={{paddingTop:"10px"}}>
          <Col span={2}  offset={0}>
            <Text>Filter By </Text> 
          </Col>

          <Col span={10}  offset={0} style={{display:"flex", justifyContent:"space-around"}}>
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>Accousticness</Text>
            <InputNumber />
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>~</Text>
            <InputNumber />
          
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>Danceability </Text>
            <InputNumber />
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>~</Text>
            <InputNumber />

            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>Energy </Text>
            <InputNumber />
            <Text style={{paddingLeft:"10px",paddingRight:"10px"}}>~</Text>
            <InputNumber />
          </Col>

          <Col span={2} offset={1} style={{display: "flex",justifyContent:"center", alignItems: "center"}} > <Button>Search</Button> </Col>
          <Col span={9} offset={0}></Col>
        </Row>

        <Row justify="space-around" style={{paddingTop:"10px"}}>
          <Col span={2}  offset={0}>
            <Text>Rank By </Text> 
          </Col>

          <Col span={10}  offset={0}>         
            <Radio.Group style={{display:"flex",justifyContent:"start"}} value={rankBy} onChange={handleOnChangeRankBy} >
              <Radio value="accousticness"> Accousticness </Radio>
              <Radio value="danceability"> Danceability </Radio>
              <Radio value="energy"> Energy </Radio>
              <Radio value="duration"> Duration </Radio>
              <Radio value="random"> Random </Radio>
            </Radio.Group> 
          </Col>
          <Col span={2} offset={1} style={{display: "flex",justifyContent:"center", alignItems: "center"}}> <Button>Apply</Button> </Col>


          <Col span={9} offset={0} style={{justifyContent:"center"}}> </Col>
        </Row>





      </div>

      <Table columns={columns} dataSource={data} style={{paddingTop:"10px"}} />


    </div>
  )
}

export default SearchPage;