
import React , { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { StarRating, IPFSImg  } from '../common';

function OrderDetails(props) {
  const [record, setRecord] = useState(props.rec);
  const [photos, setPhotos] = useState([]);
  const [content, setContent] = useState('');
  
  const getContents = (rec)=>{
    const list = [];
    ['cooking', 'ingredients', 'plates'].map((v)=> {
        const r = (!rec || !rec[v]) ? [] : rec[v];
        r.map((v2)=>  list.push(v2.text + '; '));
        return true;
    });
    setContent(list.join(' '));
    
  }
  const getImages = (rec)=>{
    const list = [];
    ['cooking', 'ingredients', 'plates'].map((v)=> {
        const r = (!rec || !rec[v]) ? [] : rec[v];
        r.map((v1) => {
          const photos = (!v1.photos) ? [] : v1.photos;
          photos.map((v2)=> {
            if (v2 && v2.ipfs) {
              list.push(v2.ipfs);
            } 
            return true;
          });
          return true;
        })
        return true;
    });
    setPhotos(list);
  }

  useEffect(()=> {
    setRecord(props.rec);
    getImages(props.rec);
    getContents(props.rec);
  }, []);

  useEffect(()=> {
    setRecord(props.rec);
    getImages(props.rec);
    getContents(props.rec);
  }, [props.version]);

  return  (
    <Container className="p-1 border border-primary round"  fluid={true} >
      <Row>
        <Col xs={2} style={{textAlign: "center"}} className="p-0">
        <IPFSImg ipfs={photos[0]} isCache={true} className="m-3 float-left"
          style={{width:'92%', minHeight:'120px', objectFit: 'cover'}}/>
        </Col>
        <Col xs={10}  className="p-3">
        <b>{record && record.name}</b><hr/>
          <span>{content}</span>
          <b>{record && record.published}</b>
          <h4 className="p-2">{(!record || !record.price) ? 'Call Foodie' : ('$' + record.price)}</h4>
        </Col>
        <br/>
      </Row>
    </Container>
  );
}
export default OrderDetails;
