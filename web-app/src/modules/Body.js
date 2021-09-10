import React , { useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import { Home } from "./content";
import { ApplicationsList, UsersList } from "./authUsersAdmin";

function Body(props) {
  useEffect(() => {
  }, []);

  return (
    <Container fluid={true} className="m-0 p-0">
        <Switch>
          <Route  exact path="/">
            <Home/>
          </Route>
          <Route  exact path="/authUsers">
            <ApplicationsList/>
          </Route>
          <Route  exact path="/authUsers/:uid">
            <UsersList/>
          </Route>
          <Route  exact path="/transReport">
            <Home/>
          </Route>
        </Switch>
    </Container>
   
  );
}

export default Body;
