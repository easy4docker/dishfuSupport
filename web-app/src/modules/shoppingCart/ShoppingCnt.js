
import React, {useEffect, useState} from 'react';

import { Badge } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { DataStore } from '../../stores';
import { Engine } from '../common';

function ShoppingCnt(props) {
  const engine = new Engine();
  const [cnt, setCnt] = useState(0);
  
  const getOrderCount = (orders)=> {
    let cnt = 0;
    for (let v in orders) {
      cnt += (!orders[v] || !orders[v].count) ? 0 : orders[v].count;
    }
    setCnt(cnt);
    return cnt;
  }
  useEffect(() => {
    const shppingHandle = DataStore.subscribe(()=> {
      if (DataStore.getState().LastAction === 'shopping') {
        getOrderCount(DataStore.getState().data.orders);
      }
    });
    engine.loadStorageData({}, ()=>{
      getOrderCount(DataStore.getState().data.orders);
    });
    return ()=> {
      shppingHandle();
    }
  }, []);

  return (<span className={(props.className) ? props.className : 'text-light bg-primary'}>
  <FontAwesomeIcon size="1x" icon={faShoppingCart}/><Badge className="ml-1 alert-primary" 
  style={{position:'relative', fontSize:'0.6rem', top:'-0.4rem'}}>{cnt}</Badge></span>);
}

export default ShoppingCnt;
