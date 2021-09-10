import React , { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import { OperationSection } from '.';
import { SettingStore } from '../../stores';

import { RecipeList } from './recipes';
import { PlateList } from './plates';
import { useLocation  } from "react-router-dom";

function Workshop(props) {
  const [operationRole, setOperationRole] = useState('');
  const location = useLocation();
  useEffect(()=> { 
    const handleSubscribe = SettingStore.subscribe(() => {
      if (SettingStore.getState()._watcher === 'role') {
        console.log('===role changed', SettingStore.getState().data.operationRole);
       setOperationRole(SettingStore.getState().data.operationRole);
      }
    });
    setOperationRole(SettingStore.getState().data.operationRole);
    return ()=> {
      handleSubscribe();
    }
  }, []);

  return (
    <Container className="p-3">{props.tm}
      <OperationSection/>
      <div className="clearfix p-1 m-0"></div>
      {JSON.stringify(SettingStore.getState())}
      =={operationRole}==
      {(operationRole === 'foodie') && (<RecipeList/>)}
      {(operationRole === 'supie') && (<PlateList/>)}
    </Container>
  );
}
export default Workshop;