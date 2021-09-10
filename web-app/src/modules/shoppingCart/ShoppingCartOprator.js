
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Badge, Button } from 'react-bootstrap';
import { DataStore } from '../../stores';
import { Engine } from '../common';

function ShoppingCartOprator(props) {
  const engine = new Engine();
  const [item, setItem] = useState(props.code);
  const [cnt, setCnt] = useState(0);

  const getOrderCount = ()=> {
    const idx = DataStore.getState().data.orders.findIndex((v)=> v && v.code === item);
    const order = (idx !== -1) ? DataStore.getState().data.orders[idx] : null;
    setCnt(!order? 0 : order.count);
  }

  const isOrdersCount = ()=> {
    return (DataStore.getState().data.orders.length) ? true : false;
  }

  const add = ()=> {
    DataStore.dispatch({
      type: 'updateShoppingCartItem',
      data : { code : props.code, count: (cnt + 1)}
    })
  }
  const minus = ()=> {
    DataStore.dispatch({
      type: 'updateShoppingCartItem',
      data : { code : props.code, count: (cnt > 0) ? (cnt - 1) : 0}
    })
  }
  const remove = ()=> {
    DataStore.dispatch({
      type: 'removeShoppingCartItem',
      data : { code : props.code}
    })
  }
  const cleanShoppingCart = ()=> {
    DataStore.dispatch({
      type: 'initShoppingCart'
    })   
  }

  useEffect(() => {
    setItem(props.code);
    const shppingHandle = DataStore.subscribe(()=> {
      if (DataStore.getState().LastAction === 'shopping') {
        getOrderCount();
      }
    });
    engine.loadStorageData({}, ()=>{
      getOrderCount();
    });
    return ()=> {
      shppingHandle();
    }
  }, []);

  return (<span className={(props.className) ? props.className : 'text-light bg-primary'}>
  {(props.operater === 'minus') && (<FontAwesomeIcon size="1x" icon={faMinus} onClick={minus} />)}
  {(props.operater === 'plus') && (<FontAwesomeIcon size="1x" icon={faPlus} onClick={add} />)}
  {(props.operater === 'remove') && (<FontAwesomeIcon size="1x" icon={faTrashAlt} onClick={remove} />)}
  {(props.operater === 'initShoppingCart' && isOrdersCount()) && 
      (<Button variant ="link" onClick={cleanShoppingCart} >
        <FontAwesomeIcon size="1x" icon={faShoppingCart} className="mr-2" />{(!props.caption) ? '' : props.caption}
      </Button>)}

  {(props.operater === 'showCount') && 
      (<Badge className="text-primary alert-primary p-2">
        {cnt}
      </Badge>)
  }
  {(props.operater === 'showTotal') && 
       (<div className="p-2 text-center text-dark">${cnt * props.price}</div>)
  }
  </span>);
}

export default  ShoppingCartOprator;
