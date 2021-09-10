import React , { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

import { SettingStore } from '../../stores';

function AuthHeadItem(props) {
    const [isAuth, setIsAuth ] = useState(false);
    useEffect(() => {
        const handleSubscribe = SettingStore.subscribe(() => {
          if (SettingStore.getState()._watcher === 'auth') {
            setIsAuth(SettingStore.getState().data.auth);
          }
          return false;
        });
        setIsAuth(SettingStore.getState().data.auth);
        return ()=> {
          handleSubscribe();
      }
      }, []);

    return (<div className="rounded p-1 m-0" style={{fontSize:'1.1rem'}}>
        <span className={(!isAuth) ? '  menu-color ' : ' text-light  '}>
        <FontAwesomeIcon size="1x" icon={(!isAuth) ? faQrcode : faUnlockAlt} className="mr-1" /> Auth
        </span>
    </div>)
}

export { AuthHeadItem }