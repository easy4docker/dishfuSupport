
import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { DataStore } from '../../stores';

const  AddOrder = (props) => {
  const AddToOrders = ()=> {
    DataStore.dispatch({
      type: 'addShoppingCartItem',
      data : { code : props.code, count: (!props.count) ? 1 :  props.count}
    })
  }
  return  (
    <Button onClick={ AddToOrders}>
        Order
    </Button>);
}

export { AddOrder };
