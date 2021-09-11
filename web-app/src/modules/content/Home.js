import React , { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Engine } from '../common';

function Home(props) {
  const engine = new Engine();
  useEffect(() => {

  }, []);
  return (
    <Container fluid={true} className="p-0 m-0 content-body">
      <Container fluid={true} className="p-0 m-0 content-body">
        <Container className="alert-light text-secondary p-3">
            Nothing to address
        </Container>
      </Container>
    </Container>
  );
}
export default Home;
