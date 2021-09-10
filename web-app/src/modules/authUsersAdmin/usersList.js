import React , { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { AddressInput, Engine } from '../common';
import { SettingStore } from '../../stores';

function UsersList(props) {
  const engine = new Engine();
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const submitApplication = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('application', {
      action: 'save',
      data: {
        type:'foodie', 
        visitorId: SettingStore.getState().fp, 
        address:address,
        phone : phone,
        description: description
      }
    }, ()=>{
      engine.loadingOff();
      setSuccess(true);
    });
  }
  const onDescriptionChanged = (e)=> {
    setDescription(e.target.value);
  }
  const onPhoneChanged = (e)=> {
    const patt = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (patt.test(e.target.value)) {
      e.target.value = e.target.value.replace(patt, '($1)$2-$3');
      setPhone(e.target.value.replace(patt, '($1)$2-$3'));
    } else {
      setPhone('');
    }
  }
  const isSubmit = () => {
    return (!address) ? false : true;
  }

  useEffect(()=> {}, []);

  const successForm = () =>  (
    <Container>
      <Alert variant="success mt-3">
        <Alert.Heading>You application submitted!</Alert.Heading>
          <span>
            You might become a foodie automatically upon our AI valification. or you will be contacted sooner. 
          </span>
        </Alert>
    </Container>);

  const inputForm = () => (
   <Container className="mb-3 pb-3">
      <Alert variant="secondary mt-3">
        <Alert.Heading>If you have the Foodie role:</Alert.Heading>
        <ul>
          <li>You can be a housewife who wants to share her cooking hobby with neighbours, 
            while making a side income. Foodie can be a restaurant owner, to extend their business objectives. </li>
          <li>You needs to provide a real address (not PO box), can create receipts, and contact supplies. </li>
          <li>You drives the following workflow: create receipt -> contact supplier and confirm the plate -> 
            publish the plate to “menu”</li>
          <li>You authentication requires a barcode provided by DishFoo via mail. 
            Once the barcode is scanned, then Foodie can publish the plate to the menu.</li>
        </ul>
      </Alert>
      <Form>
      <Form.Group>
          <Form.Label><b>Foodie Address:</b> <span className="form_notice_info">* Required</span></Form.Label>
          <AddressInput passAddress={setAddress} defaultValue={address}/>
        </Form.Group>
        <Form.Group>
          <Form.Label><b>Application Description:</b> <span className="form_notice_info">(Option)</span> </Form.Label>
          <Form.Control defaultValue={description} placeholder="Input Description" as="textarea" 
            rows="3"
            onChange={onDescriptionChanged } />
        </Form.Group>
        <Form.Group>
          <Form.Label><b>Contact Phone:</b> <span className="form_notice_info">(Option)</span></Form.Label>
          <Form.Control defaultValue={phone} placeholder="Input Contact Phone" as="textarea" 
            rows="1"
            onChange={onPhoneChanged} />
        </Form.Group>
        <Button className="btn btn-info m-0 mr-3" disabled={!isSubmit()}  onClick={submitApplication}>
          <FontAwesomeIcon size="1x" icon={faSearch} className="m-0" /> Submit
        </Button>
      </Form>
   </Container>);
   return (!success) ? inputForm() : successForm();
}

export { UsersList }