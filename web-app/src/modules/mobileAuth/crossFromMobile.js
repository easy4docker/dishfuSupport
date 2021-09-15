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
  const [phone, setPhone] = useState('5108467571');
  const [success, setSuccess ] = useState(false);
  // const [validPhone, setValidPhone] = useState(false);

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
      setSuccess(true);
    });
  }
  useEffect(() => {
    // permit();
  }, []);

  const Frame = (info) => (<Container fluid={true} className="m-0 p-0">
  <InfoHeader comp={'Auth with Mobile'}/>
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
    engine.DatabaseApi('admin', {
      action: 'checkPhone',
      data: {
        visitorId: SettingStore.getState().fp, 
        phone : phone.replace(patt, '$1$2$3')
      }
    }, (result)=>{
      engine.loadingOff();
      if (result.status === 'success') {
        console.log(result);
        history.push('/SuccessInfo/phone/' + phone);
        setSuccess(true);
        // setValidPhone(patt.test(phone));
        //  createSocket();
      }
    });
 }
const phoneForm = (<Frame title="Request authentication:" body={(
    <Container className="p-3">
      <Form.Group className="p-3">
      <Form.Label>Your phone number</Form.Label>
      <Form.Control defaultValue={phone} placeholder="(xxx)xxx-xxxx" type="text" style={{fontSize:'2rem'}}
        onChange={onPhoneChanged} />
    </Form.Group>
    <Form.Group className="p-3">
        {(!!isSubmit()) && (<Button className="btn btn-info" onClick={submitPhone}
          style={{width:"100%"}}>
            Submit
          </Button>)}
    </Form.Group>
    </Container>)} />);

const successPhone = (<Frame title="Succeess!" body="The authentication request has been sent. A text message is coming!" />);  
  
return (isAuth) ? warningPage : ( success) ? successPhone : phoneForm

/*

  const getTargetSocket = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('admin', {
      action: 'getTargetSocket',
      data: {
        token: targetToken, 
        phone : targetPhone
      }
    }, (result)=>{
      const socketid = !result.data || !result.data[0] ? '' : result.data[0].socketid;
      if (result.status === 'success' && !!socketid) {
        setTargetSocket(socketid)
      } 
    });
  }
  const purePhone = (phone)=> {
    return (!phone ? '' : phone).replace(patt, '$1$2$3');
 }

  useEffect(() => {
    getTargetSocket();
    const info = SettingStore.getState().data.authInfo;
    console.log('---info--->', info, params);
    // if (info.token != token) {
      engine.loadingOn();
      engine.DatabaseApi('admin', {
        action: 'checkTokenAuthCode',
        data: {
          token: info.token, 
          authcode : info.authcode
        }
      }, (result)=>{
        console.log('---result-->', result);
        engine.loadingOff();
        if (result.status !== 'success') {
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
      });
   //  }

  }, []);

  useEffect(() => {
    if (targetSocket) {
    //  permit();
    }
  }, [targetSocket]);

const  fmtPhone = (phone)=> {
  return (!phone ? '' : phone).replace(patt, '($1)$2-$3')
}

const existAuthInfo = () => {
  const info = SettingStore.getState().data.authInfo;
  return (!!info) && (<Container fluid={true} className="alert-secondary p-3 m-1">
    Current authentication information on this equipment is:<br/>
    Phone: <b>{fmtPhone(info.phone)}</b><br/>
    Authrized Time: <b>{info.created}</b><br/>
</Container>)
}

  const Frame = (info) => (<Container fluid={true} className="m-0 p-0">
  <InfoHeader comp={'Auth with Mobile'}/>
  <Container>
    <Alert variant={!info.variant ? 'light mt-3' :  info.variant}>
    <Alert.Heading>{info.title}</Alert.Heading>
      {info.body}
    </Alert>
  </Container>
  </Container>)

const warningPage = (targetSocket) && (<Frame title="To confirm:" 
  body={(<Container fluid={true}>
    {existAuthInfo()}
    <Button onClick={permit} className="m-2">
        Authorize the desktop
    </Button>
    <Button onClick={ ()=> { setIsContinue(false)} } variant="danger" className="m-2">
        Stop
    </Button> 
  </Container>
  )} />);
  
  const unAuthentication = (<Frame title="Warning!" body="The fail to process the QR!" variant="danger m-3 p-3" />);  
  const successPage = (<Frame title="Succeess!" body="The mobile authentication completed! You can use this equipment for desktop admin application." />);  
  const stopContinuePage = (<Frame title="Stop!" body="No worry. The mobile authentication is not going through!" />);
  
  return 'test-' + props.isAuth + '-user Auth-' +   JSON.stringify(SettingStore.getState().data.authInfo) + 
  '--' +  JSON.stringify(params);
  
  // ((!isAuth) ? unAuthentication : (!isContinue) ? stopContinuePage : (success) ? successPage : warningPage)
  ;
  */
}
export { CrossFromMobile };