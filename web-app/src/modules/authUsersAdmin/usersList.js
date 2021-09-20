import React , { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { AddressInput, Engine } from '../common';
import { SettingStore } from '../../stores';

function UsersList(props) {
  const engine = new Engine();
  const [address, setAddress] = useState('');
  const [qualification, setQualification] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);


  useEffect(()=> {}, []);

  const successForm = () =>  (
    <Container>
    <Alert variant="success mt-3">
      <Alert.Heading>You application submitted!</Alert.Heading>
        <span>
          You might become a supie automatically upon our AI valification. or you will be contacted sooner. 
        </span>
      </Alert>
    </Container>);
/*
  const errorBox = () => {
    const title = (<span className="text-success">You application submitted! </span>)
    const message = (<span className="text-success">
    You might become a supie automatically upon our AI valification. or you will be contacted sooner. </span>)
    return (<alert message={message} title={title} className="mt-3"/>)
  }
*/
  const inputForm = ()=> (
   <Container className="mb-3 p-3">
     Users List
   </Container>);

   return (!success) ? inputForm() : successForm()
}

export { UsersList }