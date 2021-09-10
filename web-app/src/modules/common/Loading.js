import React, { useState, useEffect} from 'react';
import { Spinner } from 'react-bootstrap';
import { SettingStore } from '../../stores/';

function Loading() {
  const [ sts, setSts] = useState(0);

  useEffect(()=>{
    const handleSubscribe = SettingStore.subscribe(() => {
      if (SettingStore.getState()._watcher === 'loading') {
         setSts(Object.keys(SettingStore.getState().loading).length);
      }
    });
    return ()=> {
      handleSubscribe();
    }

  },[]);
  
  return (
  <div className={(sts) ? 'loading' : 'no-loading'}>
      <Spinner animation="border" size="md" className="loading-text"/>
  </div>
  )
}
export { Loading }
