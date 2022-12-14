/* eslint-disable no-unused-vars */
import { React, useEffect, useState} from 'react';

import MenuBar from '../components/MenuBar';
import { getSpotifyNewRelease } from '../fetcher'

import { Carousel, Button } from 'antd';
import { Layout } from 'antd';
import accoustic from '../pics/accoustic.JPG';
import dance from '../pics/dance.JPG';
import energy from '../pics/energy.JPG';
import random from '../pics/random.JPG';
const { Header, Footer, Sider, Content } = Layout;
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQCaWsqUvYGOGeK1asPu_Px8OEwpQznnI-wFw0QVSj868wqhsAVckdoIG-5DNFyy5pMVUvuCTK2JxjjPMG54nB-ncbVAR039392Wm39x3ZttLbzgWG7i4A4RogNk1rCRXluUI-MegLocujCApGlG3AUJFzXl5sb99RL_IewPGgMQT_xnQov1MajhnTJiRCIH2do');


// const handleSubmitSearch1 = async() => {
//   console.log("here")
//   spotifyApi.getNewReleases({ limit: 5, offset: 0, country: 'SE' })
//     .then(function (data) {
//       console.log(data.body)
//       //res.json({ results: data.body.items })
//     }, function (err) {
//       console.log("Something went wrong!", err);
//     });
// };

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
          <Content>
            <Carousel autoplay autoplaySpeed = {1500} style = {{ width: '100%', height:'100%'}}>
              <div style = {{justifyContent: "space-around"}}>
                <div>
                  <a href={href1}>
                    <img src={link1} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}>
                    </img>
                  </a>
                </div>
              </div>

              <div style = {{justifyContent: "space-around"}}>
                <div>
                  <a href={href2}>
                    <img src={link2} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}>
                    </img>
                  </a>
                </div>
              </div>
              
              <div style = {{justifyContent: "space-around"}}>
                <div>
                  <a href={href3}>
                    <img src={link3} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}>
                    </img>
                  </a>
                </div>
              </div>

              <div style = {{justifyContent: "space-around"}}>
                <div>
                  <a href={href4}>
                    <img src={link4} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}>
                    </img>
                  </a>
                </div>
              </div>

              <div style = {{justifyContent: "space-around"}}>
                <div>
                  <a href={href5}>
                    <img src={link5} alt="Logo" style = {{ objectFit: 'cover', width: '1800px', height: '830px'}}>
                    </img>
                  </a>
                </div>
              </div>

                
              
            </Carousel>
          </Content>

      </Layout> 
      </div>
    )

}

export default HomePage;

