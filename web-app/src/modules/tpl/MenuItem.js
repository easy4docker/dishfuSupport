
import React , { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { StarRating,  IconsImage,  IPFSImg   } from '../common';
import {  AddOrder } from '../shoppingCart';

function MenuItem(props) {
  const [record, setRecord] = useState(false);
  const getContents = (rec)=>{
    const list = [];
    ['cooking', 'ingredients', 'plates'].map((v)=> {
        const r = (!rec.data || !rec.data[v]) ? [] : rec.data[v];
        r.map((v2)=>  list.push(v2.text + '; '));
        return true;
    });
    return list.join(' ');
  }
  const getImages = (rec)=>{
    const list = [];
    ['cooking', 'ingredients', 'plates'].map((v)=> {
        const r = (!rec.data || !rec.data[v] || !rec.data[v]) ? [] : rec.data[v];
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
    return list;
  }

  useEffect(()=> {
    setRecord(props.rec);
  }, []);



  return  (!record.data) ? '' : (
    <Container className="p-1"  fluid={true}>
      <Row>
        <Col xs={2} style={{textAlign: "center"}} className="p-0 ">
          <div  className="border bg-light">
          <IPFSImg ipfs={getImages(record)[0]} isCache={true}
          style={{ maxHeight:'120px', objectFit: 'cover'}}/>
          </div>
        </Col>
        <Col xs={8}  className="p-3">
          <b>{!record.data ? '' : record.data.name}</b><br/>
          <span>{getContents(record)}
          </span>
          <b>{record.published}</b>
          
        </Col>
        <Col xs={2} style={{textAlign: "center"}} className="p-0">
          <p className="text-center p-0" style={{fontSize:'11px'}}>{record.publisher}</p>
              <StarRating value="5" readOnly="true"/>
          <h4 className="p-2">{(!record.data || !record.data.price) ? 'Call Foodie' : ('$' + record.data.price)}</h4>

          <AddOrder code={record.publishCode}/>
          <hr/>
        </Col>
        <br/>
      </Row>
    </Container>
  );
}
export default MenuItem;
