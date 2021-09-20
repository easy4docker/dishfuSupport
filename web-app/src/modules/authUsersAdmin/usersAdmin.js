import React , { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

import {Engine } from '../common';
import { UserAdmin } from './userAdmin';

function UsersAdmin(props) {
  const engine = new Engine();
  const [list, setList] = useState([]);
  const params = useParams();
  const id = params.id;

  const getAuthUserById = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('usersAdmin', {
      action: 'getAuthUsers',
      data: (id)? {
        id : id
      } : {}
    }, (result)=>{
      engine.loadingOff();
      setList(result.data);
    });
  }

  useEffect(()=> {
    getAuthUserById();
  }, []);

  const showList = () =>  (
    <Container className="mb-3 p-3">
        <Link to="/authUsers">UserItem {id}</Link>
        <Container>
          <Row>
            <Col xs={6}>
            {list.map((v, k)=> (<Container key={k} className="p-1">
              <Link to={'/authUser/'+v.id}>{v.address} -- {v.id}</Link>
            </Container>))}
            </Col>
            <Col xs={6}>
              {/*<UserAdmin/>*/}
            </Col>
          </Row>
        </Container>
    </Container>);

  const errorBox = () => {
    const title = (<span className="text-success">You application submitted! </span>)
    const message = (<span className="text-success">
    You might become a supie automatically upon our AI valification. or you will be contacted sooner. </span>)
    return (<alert message={message} title={title} className="mt-3"/>)
  }

   return showList();
}

export {UsersAdmin }