import React , { useState, useEffect } from 'react';
import { Container, Alert, Image} from 'react-bootstrap';
import { SettingStore } from '../../stores';
import QRCode from 'qrcode'
import socketClient  from 'socket.io-client';

function ClientForm (props) {
   const SOCKET_URL = SettingStore.getState().config.sockerServer;
   const WEBSERVER_URL = SettingStore.getState().config.webServer;
   const [linkURL, setLinkURL] =  useState('');
   const [qr, setQr] =  useState('');

   const saveAuthInfo = (fromSocket, data)=> {
      const rec = {...data}
      rec.signInTime = new Date().getTime();
      console.log('afterTransfer,  rec->', rec, fromSocket);
      SettingStore.dispatch({
         type: 'saveAuthInfo',
         authInfo: rec
      });
  }
   const createSocket = (callback) => {
      const socket = socketClient.connect(SOCKET_URL);
      socket.on('connect', () => {
         console.log('===IN==>' + socket.id)
         const socket_id = socket.id.replace('/dishFu#', '');

         socket.on('afterTransfer', (fromSocket, body) =>{
            console.log('body=token=>', socket_id)
            console.log('body==>', fromSocket, body)
            // saveAuthInfo(fromSocket, body);
            // socket.disconnect();
          });
         
         if (callback) {
            callback(socket_id);
         }
      });
      socket.on('disconnect', () => {});
      return socket
   }
   useEffect(()=> {
      const socket = createSocket((socketid) => {
         setLinkURL(WEBSERVER_URL + '/crossFromMobile/' + socketid);
      });
      return  () => {
         socket.disconnect();
         console.log('cleaned up ===  disconnexted === ');
       };
    }, [])

    useEffect(()=> {
      createQR();
    }, [linkURL])

    const createQR = () => {
      QRCode.toDataURL(linkURL,
         {   width:338, type: 'image/png', quality: 1.0,
              color: {
                  dark: '#000000', light: '#0000'
              }
          }, 
          (err, str)=> setQr(str)
      );
   }
   return (<Alert variant="secondary">
               <Alert.Heading className="p-3">Please scan the QR code to signin</Alert.Heading>
               <Container fluid={true}>
                  {linkURL}
                  <br/>
                  {(qr) && (<Image src={qr} className="border border-primary"/>)}
               </Container>
            </Alert>)
}
export { ClientForm }