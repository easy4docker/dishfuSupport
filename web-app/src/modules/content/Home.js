import React , { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Engine, StarRating,  IPFSImg } from '../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEgg } from '@fortawesome/free-solid-svg-icons';

function Home(props) {
  const [items, setItems] = useState([]);
  const engine = new Engine();

  useEffect(() => {
    engine.loadingOn();
    engine.DatabaseApi('ad', {
      action: 'homeList'
    }, (result)=>{
      engine.loadingOff();
      setItems(!result || !result.data || !result.data.promotion ? [] : result.data.promotion);
    });
  }, []);
  return (
    <Container fluid={true} className="p-0 m-0 content-body wood-bg">
      <Container fluid={true} className="p-0 m-0 content-body pic-bg">
      <div className="master-bg-video-frame bg-secondary">
        <video className="master-bg-video"
          poster="" 
          preload="auto" autoPlay loop muted>
            <source src="" type="video/mp4"/>
          </video>
      </div>
        <div style={{'minHeight':"100%"}}>
        <div className="text-center" style={{position: 'relative', height:'360px', top:'68px'}}>
          <p><b className="p-1 text-light" style={{fontSize: '3.8em', lineHeight:'2.8rem'}}>Community Workshops</b></p>
          <p><b className="p-3 text-success" style={{fontSize: '2.6em', lineHeight:'2.5rem'}}>Foodies together</b></p>
          <p className="text-warning p-3" style={{fontSize: '1.5em', lineHeight:'2rem'}}><b>
            Cooking<FontAwesomeIcon size="1x" icon={faEgg} className="m-1" style={{fontSize:'0.5rem'}}/>
            Eating<FontAwesomeIcon size="1x" icon={faEgg} className="m-1" style={{fontSize:'0.5rem'}}/>
            Sharing<FontAwesomeIcon size="1x" icon={faEgg} className="m-1" style={{fontSize:'0.5rem'}}/>
            Saving<FontAwesomeIcon size="1x" icon={faEgg} className="m-1" style={{fontSize:'0.5rem'}}/>
            Enjoying!</b></p>
        </div>
        <Container fluid={true} className="alert-light" 
            style={{position: 'relative',
            marginBottom: '0px',
            minHeight:'1024px',
            textAlign: 'center'}}>
        </Container>
      </div>
      </Container>
    </Container>
  );
}
export default Home;
