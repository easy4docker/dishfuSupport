import React, {useState, useEffect} from 'react';
import { SettingStore } from "../../stores";
import { Messagebox } from "../common";

function RoleSection({roles, exroles, comp, showException}) {
  const [myRoles, setMyRoles] = useState([]);
  const Exroles = (!exroles) ? [] : exroles;
  
  const isection = roles.filter(x => [...myRoles, 'all'].includes(x));
  const exsection  = Exroles.filter(x => [...myRoles].includes(x));
  
  const loadMyRoles = () => {
    setMyRoles( (!SettingStore.getState().data.authInfo || !SettingStore.getState().data.authInfo.roles) ? 
      [] : SettingStore.getState().data.authInfo.roles
    );
  }
  useEffect(()=> {
    const handleSubscribe =  SettingStore.subscribe(() => {
        if (SettingStore.getState()._watcher === 'role' || SettingStore.getState()._watcher === 'auth') {
          loadMyRoles();
        }
    });
    loadMyRoles();
    return ()=> {
      handleSubscribe();
    }
  }, []);

  const compException = (<div className="p-3"><Messagebox message="Missing required roles" /></div>)
  return  (!isection.length || !!exsection.length) ? ((!showException) ? '' : compException) : comp
}
export default RoleSection;
