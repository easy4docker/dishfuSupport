import React , {  useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MyCartList } from '../shoppingCart';
import { OrderItem, OrderInfo } from '../Orders';
import { ShoppingCartOprator, ShoppingCartWatcher } from '../shoppingCart';
import { Messagebox } from '../common';
function MyOrder() {
  const myList = new MyCartList();
  
  const [list, setList] = useState([]);
  const [tm, setTm] = useState(new Date().getTime());

  const ShoppingCartChanged = ()=> {
    setList(myList.getList());
    setTm(new Date().getTime());
  }
  useEffect(()=> {
    setList(myList.getList());
   }, []);
   return (<Container className="mt-3 pt-3">
    <ShoppingCartWatcher changed={ShoppingCartChanged}/>
    <ShoppingCartOprator operater="initShoppingCart" caption="Clean up the cart" className="text-primary ml-3"/>
    {(!list.length) ? '' : list.map((v, k)=> {
      return (v === null) ? '' : (<span key={k}>
        <OrderItem record={v} tm={tm}/>
      <br/></span>);
    })}
    {(!list.length)? (<Messagebox message="Empty shopping cart!" />) : ''}
  </Container>)
}
export default MyOrder;
