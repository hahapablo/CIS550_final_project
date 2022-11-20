/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllMatches, getAllPlayers } from '../fetcher'
import { get } from 'superagent';
import { Carousel } from 'antd';
import { Layout } from 'antd';
import rock from '../pics/rock.jpg';
import pop from '../pics/pop.jpg';
import edm from '../pics/edm.jpg';
import accoustic from '../pics/accoustic.jpg';
import ts from '../pics/ts.jpg';

const { Header, Footer, Sider, Content } = Layout;

const { Column, ColumnGroup } = Table;
const { Option } = Select;

const contentStyle = {
  background: rock,

};

const imgCarousel = [
  {
    id: 2,
    src: pop
  },
  {
    id: 3,
    src: rock
  },
  {
    id: 4,
    src: edm
  },
  {
    id: 5,
    src: accoustic
  },
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      pagination: null  
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)
  }


  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }

  leagueOnChange(value) {
    // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
    getAllMatches(null, null, value).then( res => {
      this.setState({ matchesResults: res.results })
    })
    
  }

  componentDidMount() {
    getAllMatches(null, null, 'D1').then(res => {
      this.setState({ matchesResults: res.results })
    })

    getAllPlayers().then(res => {
      console.log(res.results)
      // TASK 1: set the correct state attribute to res.results
      this.setState({ playersResults: res.results })
    })

 
  }

  
  render() {

    return (
  
    <div>
      <Layout>
      <MenuBar />
      <Content>
      
      <Carousel autoplay autoplaySpeed = {1500} style = {{ width: '100%', height:'100%'}}>
      <div style = {{justifyContent: "space-around"}}>
          <div>
            <img src={edm} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}} />
          </div>
        </div>
      <div style = {{justifyContent: "space-around"}}>
          <div>
            <img src={ts} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}} />
          </div>
        </div>
        <div style = {{justifyContent: "space-around"}}>
          <div>
            <img src={pop} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}/>
          </div>
        </div>
        <div style = {{justifyContent: "space-around"}}>
          <div>
            <img src={accoustic} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}} />
          </div>
        </div>
        <div style = {{justifyContent: "space-around"}}>
          <div>
            <img src={rock} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}} />
          </div>
        </div>
        
       
      </Carousel>
      </Content>

      
    </Layout> 
        </div>
    )
  }

}

export default HomePage

