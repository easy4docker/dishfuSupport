import React , { useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import { Home } from "./content";


function Body(props) {
  useEffect(() => {
  }, []);

  return (
    <Container fluid={true} className="m-0 p-0">
        <Switch>
          <Route  exact path="/">
            <Home/>
          </Route>
        </Switch>
    </Container>
   
  );
}

export default Body;
