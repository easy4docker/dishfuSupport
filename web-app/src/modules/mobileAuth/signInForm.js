import React , { useState, useEffect } from 'react';
import { Container, Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

function SignInForm (props) {
   const [phone, setPhone] = useState('');

   const onPhoneChanged = (e)=>{
      const patt = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (patt.test(e.target.value)) {
        e.target.value = e.target.value.replace(patt, '($1)$2-$3');
        setPhone(e.target.value.replace(patt, '($1)$2-$3'));
      } else {
        setPhone('');
      }
    }
   const isSubmit = ()=>{
      return (!phone) ? false : true;
   }
   const submitApplication = ()=> {

   }
   return (<Container fluid={true} className="p-3 m-3 content-body">
      <Form>
         <Form.Group>
          <Form.Label>Signin with your smart phone</Form.Label>
          <Form.Control defaultValue="" placeholder="(xxx)xxx-xxxx" type="text" style={{fontSize:'2rem'}}
            onChange={onPhoneChanged} />
        </Form.Group>
        <Form.Group>
            <Form.Label className="p-2">
            <Button className="btn btn-warning m-0 mr-3" disabled={!isSubmit()}  onClick={submitApplication}>
               <FontAwesomeIcon size="1x" icon={faMobileAlt} className="m-0" /> Submit
            </Button>
            </Form.Label>
            <br/>
            <Form.Label className="p-2">
               After the submit, the phone {phone} will receive a text message with an authentication link.
            </Form.Label>
         </Form.Group>
      </Form>
   </Container>)
}
export { SignInForm }