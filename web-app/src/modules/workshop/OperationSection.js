import React , { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import { SettingStore } from '../../stores';

function DesignHead(props) {
  const [myRoles, setMyRoles] = useState([]);
  const [operationRole, setOperationRole] = useState(null);
  const roles = SettingStore.getState().allRoles.sort((a, b)=> (b.id) && (a.id) &&  a.id - b.id);
  const changeRole = (code)=> {
    setOperationRole(code);
    SettingStore.dispatch({
      type: 'updateOperationRole',
      operationRole: code
    });
  }

  const showDesc = (code) => {
    for (let o in roles) {
      if (roles[o].code === code) {
        return roles[o].desc;
      }
    }
    return '';
  }
  const loadRoles = () => {
    const myR = !SettingStore.getState() || 
                !SettingStore.getState().data || 
                !SettingStore.getState().data.authInfo ? [] : SettingStore.getState().data.authInfo.roles;
    let operationRole = !SettingStore.getState() || 
                        !SettingStore.getState().data ? '' : SettingStore.getState().data.operationRole;

    if (myR.indexOf(operationRole) === -1) {
      operationRole = (!!myR.length) ?  myR[0] : '';
      changeRole(operationRole); 
    }
    setOperationRole((!operationRole && !!myR.length) ?  myR[0] : operationRole);
    setMyRoles(myR.sort((a, b)=> (a.id && (a.id - b.id))));
  }
  useEffect(()=> {
    loadRoles();
  }, []);
  const opertionAsLink = (v)=> {
    return 'p-3 mr-1 text-secondary ' + ((operationRole === v) ? 'operation-as-link-checked' : 'operation-as-link');
  }
  const setCurrentRole = ()=> (<Container fluid={true} className="p-0 m-0 text-right">
      <span className="p-2 m-0 text-primary pl-2 border">
          {JSON.stringify(myRoles)} -- {operationRole}<b> Swith role:</b>
          {roles.map((v, k)=> {
            return (myRoles.indexOf(v.code) === -1) ? '' : 
            (<span key={k}  onClick={ ()=>{ changeRole(v.code); }}  className={opertionAsLink(v.code)}> {showDesc(v.code)}</span>)
          })}
      </span>
  </Container>)

  return (myRoles.length > 1) ? setCurrentRole() : ''
}
export default DesignHead;