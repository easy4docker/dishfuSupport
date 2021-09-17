import React , { useEffect, useState } from 'react';
import {useParams, useHistory } from "react-router-dom";

import { Container, Alert, Button, Form } from 'react-bootstrap';

import { SettingStore } from '../../stores';
import { InfoHeader, Engine } from '../common';
import socketClient  from 'socket.io-client';

function ThreeStamps(props) {
  const history = useHistory();

  const engine = new Engine();
  const patt = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const SOCKET_URL = SettingStore.getState().config.sockerServer;
  const params = useParams();
  
  const permit = ()=> {
    history.goBack()
    // window.close();
  }
  useEffect(() => {
    permit();
  }, []);

  const Frame = (info) => (<Container fluid={true} className="m-0 p-0">
  <InfoHeader comp={''}/>
  <Container>
    <Alert variant={!info.variant ? 'light mt-3' :  info.variant}>
    <Alert.Heading>{info.title}</Alert.Heading>
      {info.body}
    </Alert>
  </Container>
  </Container>)

  return  (<span>
      JSON.stringify(params.code)   
      <Button onClick={history.goBack}>Back to previous page</Button>
  </span>)

}
export { ThreeStamps };