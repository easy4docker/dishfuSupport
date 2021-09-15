import React  from 'react';
import { Container, Alert } from 'react-bootstrap';
import { InfoHeader } from '../common';

function SuccessInfo(props) {
  return (<Container fluid={true} className="m-0 p-0">
  <InfoHeader comp={'Auth with Mobile'}/>
  <Container>
    <Alert variant="light mt-3">
    <Alert.Heading>Success</Alert.Heading>
      Nothing
    </Alert>
  </Container>
  </Container>)
}


export { SuccessInfo }; 