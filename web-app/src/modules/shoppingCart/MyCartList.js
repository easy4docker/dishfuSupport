/*
import React, {useEffect, useState} from 'react';
import { DataStore } from '../../stores';
import { OrderDetails } from '../Orders'

function MyOrdersList(props) {
  const [list, setList] = useState([]);
  const [tm, setTm] = useState(0);
  useEffect(() => {
    setList(DataStore.getState().data.orders);
    setTm(new Date().getTime());
  }, []);

  return (<span>
    {list.map((v, k)=> {
      return (<span key={k}>{v.code}
      -{tm}-
        <OrderDetails record={v} tm={tm}/>
      <br/></span>);
    })}
  </span>)
}

export default MyOrdersList;
*/
import { DataStore } from '../../stores';
class MyOrdersList {
    constructor(prop) {
    }
    getList() {
      return DataStore.getState().data.orders;
    }
}
export default MyOrdersList;;