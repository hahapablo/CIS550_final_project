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

  render() {
    return (
    <div>
      <MenuBar />
      <Layout>
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

export default HomePage;

