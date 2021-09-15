import React , { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Image} from 'react-bootstrap';
import { Engine } from '../common';
import { SettingStore } from '../../stores';
import QRCode from 'qrcode'
import socketClient  from 'socket.io-client';

function ClientForm (props) {
   const SOCKET_URL = SettingStore.getState().config.sockerServer;
   const WEBSERVER_URL = SettingStore.getState().config.webServer;
   const engine = new Engine();
   const [token, setToken] = useState('');
   const [socketId, setSocketId] =  useState('');
   const [qr, setQr] =  useState('');

   const saveAuthInfo = (data)=> {
      const rec = {...data}
      rec.signInTime = new Date().getTime();
      console.log('afterTransfer,  rec->', rec);
      SettingStore.dispatch({
         type: 'saveAuthInfo',
         authInfo: rec
      });
  }
   const createSocket = (callback) => {
      const socket = socketClient.connect(SOCKET_URL);
      socket.on('connect', () => {
         socket.on('afterTransfer', (fromSocket, body) =>{
             //  console.log('afterTransfer, from->',fromSocket);
             saveAuthInfo(body);
             socket.disconnect();
          });
         const socket_id = socket.id.replace('/dishFu#', '');
         if (!token) {
            engine.updateSigninForm(socket_id, socket_id, '');
         } else {
            engine.updateSigninForm(token, socket_id, '');
         }
         if (callback) {
            callback(socket_id);
         }
      });
      socket.on('disconnect', () => {
         /*
          setSocketId('');
          createQR('');
          setValidPhone(false);
          */
      });
      return socket
   }
   const loadValue = ()=> {
      const st = SettingStore.getState().data.signinForm;
         setSocketId(!st ? '' : st.socketid);
         setToken(!st ? '' : st.token);
   }
   useEffect(()=> {
      loadValue();
      const handleSubscribe = SettingStore.subscribe(() => {
         if (SettingStore.getState()._watcher === 'auth') {
            loadValue();
         }
      });
      createSocket((socketid) => {
         createQR(socketid);
      });
     return ()=> {
         handleSubscribe();
     }
    }, [])

    const createQR = (token) => {
      QRCode.toDataURL(WEBSERVER_URL + '/crossFromMobile/' + token,
         {   width:338,
              type: 'image/png',
              quality: 1.0,
              color: {
                  dark: '#000000',  
                  light: '#0000'
              }
          }, 
          (err, str)=>{setQr(str)
      });
   }

   return (<Container fluid={true} className="p-3 content-body">
               <Alert variant="secondary">
                  <Alert.Heading className="p-3">Please scan the QR code to signin</Alert.Heading>
                  <Container fluid={true}>
                     {WEBSERVER_URL + '/crossFromMobile/' + token}
                     <br/>
                     <Image src={qr} className="border border-primary"/>
                  </Container>
               </Alert>
               socketId:{socketId}
               <hr/>
               token:{token}
         </Container>)
}
export { ClientForm }