import React , { useState, useEffect } from 'react';
import { Container, Image, Alert, Button } from 'react-bootstrap';
import { SettingStore } from '../../stores';
import QRCode from 'qrcode';

function TransSocketSync (props) {
  const [qr, setQr] = useState('');
  const [sockedId, setSockedId] =  useState('');
  const [url, setUrl] =  useState('');
  useEffect(()=> {
    setSockedId(new Date().getTime());
  }, [])
  useEffect(()=> {
    if (sockedId) {
        const linkUrl = SettingStore.getState().config.webServer  + '/MobileAuth/' + sockedId;
        setUrl(linkUrl);
        QRCode.toDataURL(linkUrl,
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
  return  (<Container className="content-body mt-3">
   <h4>Scan it with an authrized phone.</h4><br/>
    {url}
    <hr/>
   <Image src={qr} className="border border-primary"/>
  </Container>);
}
export {TransSocketSync  }