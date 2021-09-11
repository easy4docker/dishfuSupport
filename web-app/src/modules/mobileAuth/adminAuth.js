import React , { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import { Container, Alert, Button } from 'react-bootstrap';
import socketClient  from "socket.io-client";
import { SettingStore } from '../../stores';
import { InfoHeader } from '../common';

function AdminAuth(props) {
  const {SocketID } = useParams();
  const SOCKET_URL = SettingStore.getState().config.sockerServer;
  const [success, setSuccess ] = useState(false);
  const [isContinue, setIsContinue ] = useState(true);
  const [isAuth, setIsAuth] = useState(SettingStore.getState().data.auth);

  const permit = ()=> {

    const socket = socketClient.connect(SOCKET_URL);
    socket.on('connect', function(){
        socket.emit("transfer",SocketID, socket.id, 
        SettingStore.getState().data.authInfo);
        socket.disconnect();
        setSuccess(true);
    });
  }
  useEffect(() => {}, []);


const infoSection = (data) => (!!data) && (<div>
  Auth Code: <b>{data.authCode}</b><br/>
  Address: <b>{data.address}</b><br/>
  Roles: <b>{(!data.roles) ? '' : data.roles.join(',')}</b><br/>
</div>)

  const Frame = (info) => (<Container fluid={true} className="m-0 p-0">
  <InfoHeader comp={'Auth with Mobile'}/>
  <Container>
    <Alert variant={!info.variant ? 'light mt-3' :  info.variant}>
    <Alert.Heading>{info.title}</Alert.Heading>
      {info.body}
    </Alert>
  </Container>
  </Container>)

const warningPage = (<Frame title="Warning" 
  body={(<Container fluid={true}>
    <p className="text-danger">
      The authentication on this mobile will send to the target equipment. Please confirm!

    </p>
    <p className="alert-secondary p-2">
      {infoSection(SettingStore.getState().data.authInfo)}
    </p>
    <Button onClick={permit} className="m-2">
        Continue Anyway
    </Button>
    <Button onClick={ ()=> { setIsContinue(false)} } variant="danger" className="m-2">
        Stop
    </Button> 
  </Container>
  )} />);
  
  const unAuthentication = (<Frame title="Warning!" body="The mobile has not been authenticated!" variant="danger m-3 p-3" />);  
  const successPage = (<Frame title="succeed!" body="The mobile authentication completed!!" />);  
  const stopContinuePage = (<Frame title="Stop!" body="No worry. The mobile authentication is not going through!" />);
  
  return SocketID + ((!isAuth) ? unAuthentication : (!isContinue) ? stopContinuePage : (success) ? successPage : warningPage)
  ;
}
export { AdminAuth };