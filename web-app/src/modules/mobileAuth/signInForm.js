import React , { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { Engine } from '../common';
import { SettingStore } from '../../stores';
import QRCode from 'qrcode'
import socketClient  from 'socket.io-client';

function SignInForm (props) {
   const SOCKET_URL = SettingStore.getState().config.sockerServer;
   const engine = new Engine();
   const [phone, setPhone] = useState('');
   const [validPhone, setValidPhone] = useState(false);
   const [qr, setQr] =  useState('');
   const [sockedId, setSockedId] =  useState('');

   const patt = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

   const [token, setToken] = useState(SettingStore.getState().data.token);
   
   let socket = null;
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
        setValidPhone(true);
      });
   }
   let currentSocket = {};
   const createSocket = (callback) => {
      const socket = socketClient.connect(SOCKET_URL);
      socket.on('connect', () => {
         console.log('valid phone=>>>=>' + SOCKET_URL, socket.id);
         socket.on('afterTransfer', (fromSocket, body) =>{
              // console.log('afterTransfer, from->',fromSocket);
              // console.log('afterTransfer,  body->', body);
             // saveAuthInfo(body);
             // socket.disconnect();
          });
          const token = socket.id.replace('/dishFu#', '');
          setSockedId(token);
          createQR(token);
          setValidPhone(false);
          if (callback) callback(token)
      });
      socket.on('disconnect', () => {
          console.log('===ddd===ddd===ddd')
          setSockedId('');
          createQR('');
          setValidPhone(false);
      });
      return socket
   }
   const cleanToken = ()=> {
      engine.setToken('');
   }

   const createQR = (sockedId) => {
      QRCode.toDataURL(SOCKET_URL + '/AdminAuth/' + sockedId,
          { 
              width:338,
              type: 'image/png',
              quality: 1.0,
              color: {
                  dark: '#000000',  
                  light: '#0000'
              }
          }, (err, str)=>{
              setQr(str)
          });
   }
   useEffect(()=> {
      const t = !SettingStore.getState().data ? '' : SettingStore.getState().data.token;
      setToken(t);
      const socket = (t) ? createSocket() : (!validPhone) ? null : createSocket((token)=> {
         engine.setToken(token);
      });
      const handleSubscribe = SettingStore.subscribe(() => {
         if (SettingStore.getState()._watcher === 'auth') {
            const t = !SettingStore.getState().data ? '' : SettingStore.getState().data.token;
            setToken(t);
            if (!t && !!socket) {
               socket.disconnect();
            }
         }
         return false;
      }); 
     return ()=> {
         handleSubscribe();
     }
    }, [validPhone])

   const phoneForm = (<span>
      <Form.Group>
       <Form.Label>Signin with your smart phone</Form.Label>
       <Form.Control defaultValue="" placeholder="(xxx)xxx-xxxx" type="text" style={{fontSize:'2rem'}}
         onChange={onPhoneChanged} />
     </Form.Group>
     <Form.Group>
         <Form.Label>
         <Button className="btn btn-warning m-0 mr-3" disabled={!isSubmit()}  onClick={submitPhone}>
            <FontAwesomeIcon size="1x" icon={faMobileAlt} className="m-0" /> Submit
         </Button>
         </Form.Label>
      </Form.Group></span>);

   const QRSection = (<Alert variant="secondary">
      <Alert.Heading>Sign in request submitted!</Alert.Heading>
      <ol>
         <li>The hone {phone} will receive a text message with an authentication link.</li>
         <li>Click confirmed the link in the txt mesage.</li>
         <li>Use the phone scan QR code. give the computer client with admin permission.</li>
         </ol>
         <Container fluid={true}>
            {SettingStore.getState().config.webServer + '/AdminAuth/' + sockedId}
            <br/>
            <Image src={qr} className="border border-primary"/>
         </Container>
         <Container fluid={true} className="p-3">
            <h3>OR </h3>
         </Container>
         <Button className="btn btn-warning m-1 mr-3" onClick={cleanToken}>
            <FontAwesomeIcon size="1x" icon={faMobileAlt} className="mr-2" />Reset
         </Button>
      </Alert>)

   return (<Container fluid={true} className="p-3 content-body">
      
      <Form className="p-3">
         {(!token) && phoneForm}
         {(token) && QRSection}
      </Form>
      =={sockedId}==|| {token}
   </Container>)
}
export { SignInForm }