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
   const WEBSERVER_URL = SettingStore.getState().config.webServer;
   const engine = new Engine();

   const [phone, setPhone] = useState('');
   const [token, setToken] = useState('');
   const [socketId, setSocketId] =  useState('');
   
   const [validPhone, setValidPhone] = useState(false);
   const [qr, setQr] =  useState('');
  
   const patt = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

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
        if (result.status === 'success') {
            setValidPhone(patt.test(phone));
            createSocket();
        }
      });
   }
   // --- will remove after server message settig --//

   const tryServerCode = ()=> {
      const me = this;
      const dt = {
         code: new Date().getTime(),
         url : 'http://192.168.86.126:3006/'
      }
      fetch(SettingStore.getState().config.routeService + 'push/new/rec', {
          method: 'POST',
          body: JSON.stringify(dt),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }).then(v=>v.json()).then((data)=> {
          console.log(data);
      }).catch((err) => {
         console.log(err);
      });
   }

   const processServerCode = (action, callback)=> {
      engine.loadingOn();
      engine.DatabaseApi('admin', {
         action: (action === 'add') ? 'addSessionRecord' : 
            (action === 'delete') ? 'deleteSessionRecord' : '',
         data: {
            phone: phone.replace(patt, '$1$2$3'), 
            visitorId: SettingStore.getState().fp, 
            token : token,
            socketid : socketId
         }
      }, (result)=>{
         engine.loadingOff();
         if (callback) callback(result);
      });
   }
   const updateServerCode = (newsocketId, callback)=> {
      engine.loadingOn();
      engine.DatabaseApi('admin', {
         action: 'updateSessionRecord',
         data: {
         phone: phone.replace(patt, '$1$2$3'), 
         visitorId: SettingStore.getState().fp, 
         token : token,
         socketid : newsocketId
         }
      }, (result)=>{
         engine.loadingOff();
         if (callback) callback(result);
      });
   }
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
      if (!phone) {
         return true;
      }
      const socket = socketClient.connect(SOCKET_URL);
      socket.on('connect', () => {
         socket.on('afterTransfer', (fromSocket, body) =>{
             //  console.log('afterTransfer, from->',fromSocket);
             saveAuthInfo(body);
             socket.disconnect();
          });
         const socket_id = socket.id.replace('/dishFu#', '');
         if (!token) {
            engine.updateSigninForm(socket_id, socket_id, phone);
         } else {
            engine.updateSigninForm(token, socket_id, phone);
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
   const cleanToken = ()=> {
      processServerCode('delete', ()=>{
         engine.updateSigninForm('', '', '');
      });
   }
   const loadValue = ()=> {
      const st = SettingStore.getState().data.signinForm;
         setPhone(!st ? '' : st.phone);
         setSocketId(!st ? '' : st.socketid);
         setValidPhone(patt.test(st.phone));
         setToken(!st ? '' : st.token);
   }
   const purePhone = (phone)=> {
      return (!phone ? '' : phone).replace(patt, '$1$2$3');
   }
   useEffect(()=> {
      loadValue();
      const handleSubscribe = SettingStore.subscribe(() => {
         if (SettingStore.getState()._watcher === 'auth') {
            loadValue();
         }
         if (SettingStore.getState()._watcher === 'auth') {
          }
         return false;
      }); 
     return ()=> {
         handleSubscribe();
     }
    }, [])

    const createQR = (token, phone) => {
      if (!phone) {
         setQr('');
      } else {
      QRCode.toDataURL(WEBSERVER_URL + '/crossFromMobile/' + purePhone(phone) + '/' + token,
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
   }
    useEffect(()=> {
      if(token) {
         createSocket();
         if (token === socketId) {
            console.log('add once===============>');
            processServerCode('add', ()=>{
               console.log('after add ===============>', token);
               createQR(token, phone);
            });
         } else {
            createQR(token, phone);
         }
      }
    }, [token])

    useEffect(()=> {
      if(socketId) {
         updateServerCode(socketId);
      }
    }, [socketId])

   const phoneForm = (<span>
      <Form.Group>
       <Form.Label>Signin with your smart phone</Form.Label>
       <Form.Control defaultValue={phone} placeholder="(xxx)xxx-xxxx" type="text" style={{fontSize:'2rem'}}
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
      <Alert.Heading className="p-3">Request submitted! What's the next step?</Alert.Heading>
      <ol>
         <li>The phone {phone} will receive a text message with an authentication link.</li>
         <li>Click confirmed the link of the txt mesage.</li>
         <li>Last step, to use the phone scan this QR code. The computer client with grant an admin permission.</li>
         </ol>
         <Container fluid={true}>
            {WEBSERVER_URL + '/crossFromMobile/' +  purePhone(phone) + '/' + token}
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
               <Button className="btn btn-danger m-1 mr-3" onClick={tryServerCode}>
            <FontAwesomeIcon size="1x" icon={faMobileAlt} className="mr-2" />TEST
         </Button>
      <Form className="p-3">
         {(!validPhone) && phoneForm}
         {(validPhone) && QRSection}
      </Form>
      socketId:{socketId}
      <hr/>
      token:{token}
   </Container>)
}
export { SignInForm }