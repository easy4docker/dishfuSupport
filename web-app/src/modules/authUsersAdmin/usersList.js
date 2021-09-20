import React , { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { AddressInput, Engine } from '../common';
import { SettingStore } from '../../stores';

function UsersList(props) {
  const engine = new Engine();
  const [list, setList] = useState(false);

  const getAuthUsers = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('usersAdmin', {
      action: 'getAuthUsers',
      data: {

      }
    }, (result)=>{
      engine.loadingOff();
      setList(result);
    });
  }

  useEffect(()=> {
    getAuthUsers();
  }, []);

  const showList = () =>  (
    <Container>
      {JSON.stringify(list)}
    </Container>);

  const errorBox = () => {
    const title = (<span className="text-success">You application submitted! </span>)
    const message = (<span className="text-success">
    You might become a supie automatically upon our AI valification. or you will be contacted sooner. </span>)
    return (<alert message={message} title={title} className="mt-3"/>)
  }

  const inputForm = ()=> (
   <Container className="mb-3 p-3">
     Users List
   </Container>);

   return showList();
}

export { UsersList }