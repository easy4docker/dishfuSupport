import React , { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import { Container, Alert, Button } from 'react-bootstrap';
import { SettingStore } from '../../stores';
import { InfoHeader, Engine } from '../common';
import socketClient  from 'socket.io-client';

function CrossFromMobile(props) {
  const engine = new Engine();
  const patt = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const SOCKET_URL = SettingStore.getState().config.sockerServer;
  
  const [isContinue, setIsContinue ] = useState(true);
  const [success, setSuccess ] = useState(false);
  const params = useParams();
  const targetToken = useParams().token;
  const targetPhone = useParams().phone;

  const [targetSocket, setTargetSocket] = useState('');
  const [isAuth, setIsAuth] = useState('');
  const permit = ()=> {
    console.log('======permit====>' + targetSocket)
    const socket = socketClient.connect(SOCKET_URL);
    socket.on('connect', function(){
        socket.emit("transfer",targetSocket, socket.id, 
        SettingStore.getState().data.authInfo);
        socket.disconnect();
        setSuccess(true);
    });
  }
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
  
  return  ((!isAuth) ? unAuthentication : (!isContinue) ? stopContinuePage : (success) ? successPage : warningPage)
  ;
}
export { CrossFromMobile };