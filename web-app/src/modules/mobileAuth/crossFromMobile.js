import React , { useEffect, useState } from 'react';
import {useParams, useHistory } from "react-router-dom";

import { Container, Alert, Button, Form } from 'react-bootstrap';

import { SettingStore } from '../../stores';
import { InfoHeader, Engine } from '../common';
import socketClient  from 'socket.io-client';

function CrossFromMobile(props) {
  const history = useHistory();

  const engine = new Engine();
  const patt = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const SOCKET_URL = SettingStore.getState().config.sockerServer;
  
  const [isAuth, setIsAuth] = useState(props.isAuth);
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage ] = useState('');
  
  const params = useParams();
  
  const confirmedAuth = ()=> {
    history.push('/SuccessInfo/crossFromMobile/success');
  } 
  const stopAuth = ()=> {
    history.push('/SuccessInfo/crossFromMobile/stop');
  } 

  const permit = ()=> {
    const socket = socketClient.connect(SOCKET_URL);
    socket.on('connect', () => {
      const socket_id = socket.id.replace('/dishFu#', '');
      socket.emit("transfer", params.token, socket_id, 
        { action: 'sendAuthInfo',
          data : SettingStore.getState().data.authInfo
        });
      socket.disconnect();
      confirmedAuth();
    });
    
  }
  useEffect(() => {
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

  const warningPage = (<Frame title="QR Code captualed!" body={(<Container fluid={true}>
    <Form.Text className="center text-secondary h5 p-3 mt-3">
        Click the Yes button to authorize the desktop application from this phone.
    </Form.Text>
    <Button onClick={permit} style={{width:"100%"}} className="btn btton-warning">
        Yes, continue
    </Button>
    <Form.Text className="center text-secondary h5 p-3 mt-3">
        If it is not your expectd process. please click stop button to skip that authentication process
    </Form.Text>
    <Button onClick={ stopAuth } style={{width:"100%"}} variant="danger" className="m-2">
        Stop the authentication
    </Button> 
  </Container>
  )} />);

  const onPhoneChanged = (e)=>{
    if (patt.test(e.target.value)) {
      e.target.value = e.target.value.replace(patt, '($1)$2-$3');
      setPhone(e.target.value.replace(patt, '($1)$2-$3'));
    } else {
      setPhone('');
    }
  }
  const isSubmit = ()=>{
    return (!phone) ? false : true;
 }

 const submitPhone = ()=> {
    engine.loadingOn();
    setErrorMessage('');
    engine.DatabaseApi('admin', {
      action: 'checkPhone',
      data: {
        token: params.token,
        visitorId: SettingStore.getState().fp, 
        phone : phone.replace(patt, '$1$2$3')
      }
    }, (result)=>{
      engine.loadingOff();
      if (result.status === 'success') {
        history.push('/SuccessInfo/phone/' + phone);
      } else {
        setErrorMessage(result.message);
      }
    });
 }
  const phoneForm = (<Frame title="Request authentication:" body={(
      <Container className="p-3">
        <Form.Group className="p-2">
        <Form.Label>Your phone number</Form.Label>
        <Form.Control defaultValue={phone} placeholder="(xxx)xxx-xxxx" type="text" style={{fontSize:'1.8rem'}}
          onChange={onPhoneChanged} />
      </Form.Group>
      <Form.Group className="p-3">
          {(!!isSubmit()) && (<Button className="btn btn-info" onClick={submitPhone}
            style={{width:"100%"}}>
              Submit
            </Button>)}
      </Form.Group>
      <Form.Text className="text-danger text-center"><h3>{errorMessage}</h3></Form.Text>
      </Container>)} />);

  return  (isAuth) ? warningPage : phoneForm

}
export { CrossFromMobile };