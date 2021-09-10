import React , { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { AddressInput, Engine } from '../common';
import { SettingStore } from '../../stores';

function TransList(props) {
  const engine = new Engine();
  const [address, setAddress] = useState('');
  const [qualification, setQualification] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const submitApplication = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('application', {
      action: 'save',
      data: {
        type:'supie', 
        visitorId: SettingStore.getState().fp, 
        address:address, 
        phone : phone,
        qualification: qualification,
        description: description
      }
    }, ()=>{
      engine.loadingOff();
      setSuccess(true);
    });
  }
  const onQualificationChanged = (e)=> {
    setQualification(e.target.value);
  }
  const onDescriptionChanged = (e)=> {
    setDescription(e.target.value);
  }

  const isSubmit = () => {
    return (!phone || !address || !qualification) ? false : true;
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
   <Container className="mb-3 pb-3">
      <Alert variant="secondary mt-3">
        <Alert.Heading>If you have the Supie role</Alert.Heading>
        <ul>
          <li>You can be grocery stores, farms or restaurants.</li>
          <li>You can make plate based on receipt and send back to Foodie for validation.</li>
          <li> You needs to provide a real address (not PD box), can view the receipts from Foodie.</li>
        </ul>
      </Alert>

      <Form>
        <Form.Group>
          <Form.Label><b>Supie Address:</b> <span className="form_notice_info">* Required</span></Form.Label>
          <AddressInput passAddress={setAddress} defaultValue={address}/>
        </Form.Group>
        <Form.Group>
          <Form.Label><b>Contact Phone:</b> <span className="form_notice_info">* Required</span></Form.Label>
          <Form.Control defaultValue={phone} placeholder="Input Contact Phone" as="textarea" 
            rows="1"
            onChange={onPhoneChanged} />
        </Form.Group>
        <Form.Group>
          <Form.Label><b>Your Qualification:</b> <span className="form_notice_info">* Required</span></Form.Label>
          <Form.Control defaultValue={qualification} placeholder="Input Qualification" as="textarea" 
            rows="1"
            onChange={onQualificationChanged } />
        </Form.Group>
        <Form.Group>
          <Form.Label><b>Application Description:</b> <span className="form_notice_info">(Option)</span> </Form.Label>
          <Form.Control defaultValue={description} placeholder="Input Description" as="textarea" 
            rows="3"
            onChange={onDescriptionChanged } />
        </Form.Group>
        <Button className="btn btn-info m-0 mr-3" disabled={!isSubmit()} onClick={submitApplication}>
          <FontAwesomeIcon size="1x" icon={faCloudUploadAlt} className="m-0" /> Submit
        </Button>
      </Form>
   </Container>);

   return (!success) ? inputForm() : successForm()
}

export { TransList }