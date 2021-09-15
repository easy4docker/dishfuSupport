import React  from 'react';
import { Container, Alert } from 'react-bootstrap';
import { InfoHeader } from '../common';
import {useParams } from "react-router-dom";

function SuccessInfo(props) {
  const params = useParams();
  const code = params.code;
  const info = (code === 'phone') ? {
    header : 'Success submitted!',
    title : 'Auth with Mobile',
    body : `The authentication request has been sent to ${params.id}. A text message is coming!`
  } : {
      header : 'nothing',
      title : 'nothing',
      body : 'nothing'
  }
  return (<Container fluid={true} className="m-0 p-0">
  <InfoHeader comp={info.title}/>
  <Container>
    <Alert variant="light mt-3">
    <Alert.Heading>{info.header}</Alert.Heading>
      {info.body}
    </Alert>
  </Container>
  </Container>)
}
export { SuccessInfo }; 