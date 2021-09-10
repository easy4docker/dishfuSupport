import React , { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import parser from 'parse-address-string';

function AddressInput(props) {
  const [inputAddress, setInputAddress] = useState(props.defaultValue);
  const [validAddress, setValidAddress] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [focused, setFocused] = useState(false);

  const onAddressChange = (e)=> {
    e.target.value = e.target.value
    verifyAddress(e.target.value);
  }
  const onAddressBlur = (e)=> {
    setFocused(false);
    if (isValid) {
      e.target.value=formatedAddress(validAddress);
    } else {
      e.target.value = '';
    }
    setInputAddress(formatedAddress(validAddress));
  }
  const capitalize = (str) => {
    return !str? '' : str.charAt(0).toUpperCase() + str.slice(1)
  }
  const upcase = (str) => {
    return !str? '' : str.toUpperCase()
  }

  const formatedAddress = (o) =>{
    return (capitalize(o.street_address1)  +  ',' + capitalize(o.city) +  ',' + upcase(o.state) + ' ' + upcase(o.postal_code) +
    upcase((o.country === 'USA') ? '' : o.country)).replace(/\s+/ig, " ");
  }
  const verifyAddress = (inputAddress)=> {
    parser(inputAddress, function(err,o){
      o.country = (!o.country) ? 'USA' : o.country;
      setValidAddress(o)
      if (!!o.street_address1 && !!o.city && !!o.postal_code && !!o.state && !err) {
        props.passAddress(formatedAddress(o));
        setIsValid(true);
      } else {
        props.passAddress('');
        setIsValid(false);
      }
    })
    return true;
}
  useEffect(()=> {
   }, []);
   return   (<Form.Group>
      <Form.Control defaultValue={inputAddress} required placeholder="Input Your address" as="textarea" 
        rows="1"
        onChange={onAddressChange} 
        onFocus={()=>{ setFocused(true)}}
        onBlur={onAddressBlur}
        />
      {(focused) && (<Form.Text className="p-3 mt-1 alert-secondary">
        <Row>
          <Col sx={6} className="p-0 pl-2">
            Street Address: <b>{validAddress.street_address1}</b><br/>
            City: <b>{validAddress.city}</b><br/>
            {(isValid) ? (<span className="text-success">Correct Format.</span>) : (<span  className="text-info">Parsing ...</span>)}
          </Col>
          <Col sx={6}  className="p-0 pl-2">
            State: <b>{validAddress.state}</b><br/>
            Postal: <b>{validAddress.postal_code}</b><br/>
            Country: <b>{validAddress.country}</b><br/>
          </Col>
        </Row>  
      </Form.Text>)}
    </Form.Group>);
}

export { AddressInput }