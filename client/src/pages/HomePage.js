/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';

import { Carousel } from 'antd';
import { Layout } from 'antd';
import accoustic from '../pics/accoustic.JPG';
import dance from '../pics/dance.JPG';
import energy from '../pics/energy.JPG';
import random from '../pics/random.JPG';
import rock from '../pics/rock.jpg';
const { Header, Footer, Sider, Content } = Layout;

const { Column, ColumnGroup } = Table;
const { Option } = Select;

const contentStyle = {

};


class HomePage extends React.Component {

  render() {
    return (
    <div>
      <MenuBar />
      <Layout>
          <Content>
            <Carousel autoplay autoplaySpeed = {1500} style = {{ width: '100%', height:'100%'}}>
              <div style = {{justifyContent: "space-around"}}>
                  <div>
                  <a href="search"><img src={dance} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}></img></a>
                  </div>
                </div>
              <div style = {{justifyContent: "space-around"}}>
                  <div>
                  <a href="search"><img src={energy} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}></img></a>                  </div>
                </div>
                <div style = {{justifyContent: "space-around"}}>
                  <div>
                  <a href="search"><img src={accoustic} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}></img></a>                  </div>
                </div>
                <div style = {{justifyContent: "space-around"}}>
                  <div>
                  <a href="search"><img src={random} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}></img></a>                  </div>
                </div>
                
              
            </Carousel>
          </Content>

      </Layout> 
      </div>
    )
  }

}

export default HomePage;

