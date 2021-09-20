import React , { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

import {Engine } from '../common';

function UserAdmin(props) {
  const engine = new Engine();
  const [rec, setRec] = useState([]);
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
      setRec(result.data);
    });
  }

  useEffect(()=> {
    getAuthUserById();
  }, []);

  const showList = () =>  (
    <Container className="mb-3 p-3">
       {JSON.stringify(rec)}
    </Container>);

  const errorBox = () => {
    const title = (<span className="text-success">You application submitted! </span>)
    const message = (<span className="text-success">
    You might become a supie automatically upon our AI valification. or you will be contacted sooner. </span>)
    return (<alert message={message} title={title} className="mt-3"/>)
  }

   return showList();
}

export {UserAdmin }