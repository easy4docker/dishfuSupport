
import React, {useEffect, useState} from 'react';

import { Badge } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


function IconCart(props) {
  return (<span className={(props.className) ? props.className : 'text-light bg-primary'}>
  <FontAwesomeIcon size="1x" icon={faShoppingCart}/><Badge className="ml-1 alert-primary" 
  style={{position:'relative', fontSize:'0.6rem', top:'-0.6rem'}}>{props.cnt}</Badge></span>);
}

export default IconCart;
