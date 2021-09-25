import React , { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

import {Engine } from '../common';
import { UserAdmin } from './userAdmin';

function UsersAdmin(props) {
  const engine = new Engine();
  const [list, setList] = useState([]);
  const [rec, setRec] = useState({});
  const params = useParams();
  const id = params.id;

  const getAuthUsers = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('usersAdmin', {
      action: 'getAuthUsers',
    }, (result)=>{
      engine.loadingOff();
      setList((!result || !result.result) ? [] : result.result);
    });
  }

  const getAuthUserById = ()=> {
    console.log('---getAuthUserById---getAuthUserById--->', params);
    engine.loadingOn();
    engine.DatabaseApi('usersAdmin', {
      action: 'getAuthUserById',
      data : {
        id : params.id
      }
    }, (result)=>{
      engine.loadingOff();
      console.log(result);
      setRec((!result || !result.result) ? {} : result.result[0]);
    });
  }

  useEffect(()=> {
    getAuthUsers();
    getAuthUserById();
  }, [id]);

  const showList = () =>  (
    <Container className="mb-3 p-3">
        <Link to="/authUsers">UserItem {id}</Link>
        <Container>
          <Row>
            <Col xs={6}>aaaa
            {list.map((v, k)=> (<Container key={k} className="p-1">
              <Link to={'/authUser/'+v.id}>{v.address} -- {v.id}</Link>
            </Container>))}bbb
            </Col>
            <Col xs={6}>
              {/*(<UserAdmin rec={rec} id={id}/>)*/}
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