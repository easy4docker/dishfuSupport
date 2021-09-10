
import React , { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { IPFSImg, StarRating } from '../common';

function MenuSection(props) {
  const [record, setRecord] = useState({});
  useEffect(()=> {
    setRecord(props.rec);
  }, []);
  return  (
    <Container className="p-1"  fluid={true}>
      <Row>
        <Col xs={2} className="p-1">
        <IPFSImg ipfs={record.ipfs} isCache={true} className="border m-1 iconsImage"
           style={{width:'98%', height:'98%', minHeight:'120px', objectFit: 'cover'}}/>
        </Col>
        <Col xs={8}>
          <p><b>{record.recipeName}</b></p>
          
          <p>{record.description}</p>
          <p>{record.description}</p>
        </Col>
        <Col xs={2} style={{textAlign: "center"}} className="p-0">
          <p className="text-center p-0" style={{fontSize:'11px'}}>{record.provider}</p>
          <StarRating value="4" readOnly="true"/>
          <h4 className="p-2">${record.price}</h4>
          <hr/>
        </Col>
        <br/>
      </Row>
    </Container>
  );
}
export default MenuSection;
