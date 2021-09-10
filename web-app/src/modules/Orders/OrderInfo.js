
import React , { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { IPFSImg  } from '../common';
import { ShoppingCartOprator } from '../shoppingCart';

function OrderInfo(props) {
  const [record, setRecord] = useState(props.rec);
  const [photos, setPhotos] = useState([]);
  const [content, setContent] = useState('');
  const itemCode = props.itemCode;
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

  return  (!record.id || !photos[0]) ? '' :  (
  <Container className="p-1"  fluid={true} >
    <div className="float-right p-2 m-1 border rounded right">
      <ShoppingCartOprator code={itemCode} operater="minus" className="text-primary mr-3"/>
      <ShoppingCartOprator code={itemCode} operater="showCount" className="text-primary"/>
      <ShoppingCartOprator code={itemCode} operater="plus"  className="text-primary ml-3"/>
      <ShoppingCartOprator code={itemCode} operater="remove"  className="text-primary ml-3"/>
      <br/>
      <ShoppingCartOprator code={itemCode} operater="showTotal" price={record.price} className="text-primary"/>
    </div>
    <Container className="p-1"  fluid={true} >
      <Row>
        <Col xs={1} style={{textAlign: "center"}} className="p-0">
          <div  className="border bg-light">
          <IPFSImg ipfs={photos[0]} isCache={true} className="m-3" 
           style={{maxWidth:'48px', maxHeight:'48px', objectFit: 'cover'}}/>
          </div>
        </Col>
        <Col xs={11}  className="p-3">
          {record && record.name}
        </Col>
        <br/>
      </Row>
    </Container>
     <div className="clearfix p-0 m-0"></div>
  </Container>
  );
}
export default OrderInfo;
