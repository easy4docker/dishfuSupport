import React , { useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import { Home } from "./content";
import { UsersList, UserItem } from "./authUsersAdmin";
import { TransDocument } from "./transReport";

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
            <Users>
          </Route>
          <Route  exact path="/authUsers/:id">
            <User/>
          </Route>
          <Route  exact path="/transReport">
            <TransDocument/>
          </Route>
        </Switch>
    </Container>
   
  );
}

export default Body;
