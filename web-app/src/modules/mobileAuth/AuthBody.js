import React , { useState, useEffect } from 'react';
import { Container, Image, Alert, Button } from 'react-bootstrap';
import QRCode from 'qrcode'
import socketClient  from 'socket.io-client';
import { SettingStore } from '../../stores';

function AuthBody(props) {
    const [qr, setQr] =  useState('');
    const [sockedId, setSockedId] =  useState('');
    const SOCKET_URL = SettingStore.getState().config.sockerServer;

    const [isAuth, setIsAuth] = useState(null);
    const [authInfo, setAuthInfo] = useState({});

    const saveAuthInfo = (data)=> {
        const rec = {...data}
        rec.auth = true;
        rec.signInTime = new Date().getTime();
       SettingStore.dispatch({
           type: 'saveAuthInfo',
           data: rec
       });
    }
    const signOutAuth = ()=> {
        const rec = {auth : false}
        SettingStore.dispatch({
           type: 'saveAuthInfo',
           data: rec
       });
    }
    const getAuthInfo = (data)=> {
        setAuthInfo(SettingStore.getState().data.authInfo);
        setIsAuth(SettingStore.getState().data.auth);
    }

    useEffect(()=> {
        getAuthInfo();
        const handleSubscribe = SettingStore.subscribe(() => {
            if (SettingStore.getState()._watcher === 'auth' || SettingStore.getState()._watcher === 'role') {
                getAuthInfo();
            }
            return false;
        }); 
        return ()=> {
            handleSubscribe();
        }
    }, [])
    useEffect(()=> {
        if (isAuth === false) {
            const socket = socketClient.connect(SOCKET_URL);
            socket.on('connect', () => {
                socket.on('afterTransfer', (fromSocket, body) =>{
                    // console.log('afterTransfer, from->',fromSocket);
                    // console.log('afterTransfer,  body->', body);
                    saveAuthInfo(body);
                    socket.disconnect();
                });
                setSockedId(socket.id.replace('/dishFu#', ''));
            });
            socket.on('disconnect', () => {
                
            });
            return ()=> {
                socket.disconnect();
            }
        }

    }, [isAuth]);

    useEffect(()=> {
        if (sockedId) {
            QRCode.toDataURL(SettingStore.getState().config.webServer  + '/MobileAuth/' + sockedId,
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
    }, [sockedId]);


    const authPage =  (<Container className="content-body mt-3">
            <h4>Scan it with an authrized phone.</h4><br/>
            {SettingStore.getState().config.webServer + '/MobileAuth/' + sockedId}
            <br/>
            <Image src={qr} className="border border-primary"/>
        </Container>)

    const infoPage =  (<Container className="content-body mt-3">
        <Alert variant="secondary mt-3">
            <Alert.Heading>Current Authentication</Alert.Heading>
                {(authInfo) && (<p className="pb-3 pt-3 m-3">
                    Address: <b>{ authInfo.address}</b><br/>
                    Roles: <b>{ ( !authInfo.roles) ? '' : authInfo.roles.join(',')}</b><br/>
                    Sign in time: <b>{ new Date(authInfo.signInTime).toLocaleDateString()} </b><br/>
                </p>)}
                <Button onClick={signOutAuth} className="m-3">
                    Sign out this equipment
                </Button>
            </Alert>
        </Container>)
    return !(isAuth) ? authPage : infoPage;
}

export {  AuthBody }