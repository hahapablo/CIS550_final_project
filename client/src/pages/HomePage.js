/* eslint-disable no-unused-vars */
import { React, useEffect, useState} from 'react';

import MenuBar from '../components/MenuBar';
import { getSpotifyNewRelease } from '../fetcher'

import { Carousel, Button } from 'antd';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQAds3VRnIuywZyBTOHSyYlzcMTwXkZEpJsDQfXKr8Ut2VRhegjHQXRmCnRTY62_zBmbRBOoRe0ncis-GI2xfwcSCpps63sAj_S5LpKzbhxt3na-QjeDuicySHpHMx6HResy8m-CprY86c6ZUtm158gOZDQxNDOcn5Ccl_4EcEENpaqMPi1cbKHvQc3a2aiN33I');

function HomePage() {
  const [newReleases, setNewReleases] = useState();
  const [link1, setLink1] = useState('')
  const [link2, setLink2] = useState('')
  const [link3, setLink3] = useState('')
  const [link4, setLink4] = useState('')
  const [link5, setLink5] = useState('')
  const [href1, setHref1] = useState('')
  const [href2, setHref2] = useState('')
  const [href3, setHref3] = useState('')
  const [href4, setHref4] = useState('')
  const [href5, setHref5] = useState('')

  useEffect(() => {
    console.log("hey")
    const func = async () => {
      spotifyApi.getNewReleases({ limit: 5, offset: 0, country: 'SE' })
      .then(function (data) {
        console.log(data.body)
        console.log(data.body.albums.items[0].images[0].url)
        console.log(data.body.albums.items[0].external_urls.spotify)
        setLink1(data.body.albums.items[0].images[0].url)
        setLink2(data.body.albums.items[1].images[0].url)
        setLink3(data.body.albums.items[2].images[0].url)
        setLink4(data.body.albums.items[3].images[0].url)
        setLink5(data.body.albums.items[4].images[0].url)


        setHref1(data.body.albums.items[0].external_urls.spotify)
        setHref2(data.body.albums.items[1].external_urls.spotify)
        setHref3(data.body.albums.items[2].external_urls.spotify)
        setHref4(data.body.albums.items[3].external_urls.spotify)
        setHref5(data.body.albums.items[4].external_urls.spotify)
        //setNewReleases(data.body)
      }, function (err) {
        console.log("Something went wrong!", err);
      });
    };
    func();
  }, []);

  return (
    <div>
      <MenuBar />
      <Layout>
          <Content style={{ }}>
            <Carousel autoplay autoplaySpeed = {1500} style = {{ width: '100%', height:'50%'}}>
              <div style = {{justifyContent: "space-around"}}>
                
                  <a href={href1}>
                    <img id="1" src={link1} alt="Logo" style = {{ objectFit: 'cover', width: '100%', height:'100%'}}>
                    </img>
                  </a>
             
              </div>

              <div style = {{justifyContent: "space-around"}}>
          
                  <a href={href2}>
                    <img id="2" src={link2} alt="Logo" style = {{ objectFit: 'cover', width: '100%', height: '100%'}}>
                    </img>
                  </a>
       
              </div>
              
              <div style = {{justifyContent: "space-around"}}>
       
                  <a href={href3}>
                    <img id="3" src={link3} alt="Logo" style = {{ objectFit: 'cover', width: '100%', height: '100%'}}>
                    </img>
                  </a>
   
              </div>

              <div style = {{justifyContent: "space-around"}}>
      
                  <a href={href4}>
                    <img id="4" src={link4} alt="Logo" style = {{ objectFit: 'cover', width: '100%', height: '100%'}}>
                    </img>
                  </a>
 
              </div>

              <div style = {{justifyContent: "space-around"}}>

                  <a href={href5}>
                    <img id="5" src={link5} alt="Logo" style = {{ objectFit: 'cover', width: '100%', height: '100%'}}>
                    </img>
                  </a>

              </div>

                
              
            </Carousel>
          </Content>

      </Layout> 
      </div>
    )

}

export default HomePage;

