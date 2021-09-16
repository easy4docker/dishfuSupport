import React , { useEffect, useState } from 'react';
import {useParams, useHistory } from "react-router-dom";

import { Container, Alert, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faUserTimes } from '@fortawesome/free-solid-svg-icons';

import { SettingStore } from '../../stores';
import { InfoHeader, Engine } from '../common';
import socketClient  from 'socket.io-client';

function LinkFromMobile(props) {
  const history = useHistory();

  const engine = new Engine();
  const SOCKET_URL = SettingStore.getState().config.sockerServer;
  
  const [isAuth, setIsAuth] = useState('');
  const [authInfo, setAuthInfo] = useState('')
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage ] = useState('');

  const [isContinue, setIsContinue ] = useState(true);
  const params = useParams();
  
  const permit = ()=> {
    console.log('======permit==A==>' + params.token)
    const socket = socketClient.connect(SOCKET_URL);
    socket.on('connect', () => {
      const socket_id = socket.id.replace('/dishFu#', '');
      console.log('====== socket.id==A==>' +  socket_id)
     
      socket.emit("transfer", params.token, socket_id, 'SettingStore.getState().data.authInfo' + new Date().getTime());
      socket.disconnect();
    });
  }
  const pullAuthInfo = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('admin', {
       action: 'getAdminSessionRecord',
       data: {
          recid: params.recid, 
          token : params.token
       }
    }, (result)=>{
       engine.loadingOff();
       setAuthInfo(result);
      // if (callback) callback(result);
    });
  }
  useEffect(() => {
    pullAuthInfo();
    console.log('---', params);
    // permit();
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

  const warningPage = (<Frame title="To confirm:" body={(<Container fluid={true}>
    <Button onClick={permit} className="m-2">
        Authorize the desktop
    </Button>
    <Button onClick={ ()=> { setIsContinue(false)} } variant="danger" className="m-2">
        Stop
    </Button> 
  </Container>
  )} />);


const phoneForm = (<Frame title="Request authentication:" body={(
    <Container className="p-3 text-center">
      {(authInfo.authCode || true) && 
      (<FontAwesomeIcon size="9x" icon={faUserCheck} className="text-success" /> )
      }
      <br/>

      <Form.Text className="text-success h4 p-2"><b>The equipment was authrized</b></Form.Text>
      <hr/>

      {(authInfo.authCode || true) && 
      (<FontAwesomeIcon size="9x" icon={faUserTimes} className="text-danger" /> )
      }

      <br/>

      <Form.Text className="text-danger h4 p-2"><b>Invalid or Expired Authentication Link</b></Form.Text>
      
      <hr/>

      {JSON.stringify(params)}
      <Form.Group className="p-2">
    
      {JSON.stringify(authInfo)}
      </Form.Group>
    </Container>)} />);

  const successPhone = (<Frame title="Succeess!" body="The authentication request has been sent. A text message is coming!" />);  
  
  return (isAuth) ? warningPage : phoneForm
}
export { LinkFromMobile };