import { Container } from 'react-bootstrap';
import React from 'react';
import { Link } from "react-router-dom";

function Footer() {
  const Year = new Date().getFullYear();
  return (
    <Container fluid={true} className="footer">
        <div className="float-left alert-secondary footer-tag">
          &copy; {Year} Dishfu &nbsp;
          &nbsp;<Link to="/privacy">Privacy</Link>
          &nbsp;|&nbsp;<Link to="/terms">Term</Link>
          
          &nbsp;|&nbsp;<Link to="/setting">setting</Link>
        </div>
        <div className="clearfix p-0 m-0"></div>
    </Container>
    
  );
}
export default Footer;
