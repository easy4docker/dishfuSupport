import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Logo } from '../common';
function InfoHeader(props) {
  return (
    <Container className="bg-info" fluid={true}>
      <Container>
        <Navbar expand="lg" className="p-1">
            <Navbar.Brand href="/" ><Logo/></Navbar.Brand>
            <Navbar.Brand className="menu-color">
              {props.comp}
            </Navbar.Brand>
        </Navbar>
      </Container>
    </Container>
  )
}
export { InfoHeader };
