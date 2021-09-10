import React , {  useEffect, useState } from 'react';
import { Container} from 'react-bootstrap';
import { OrderDetails, OrderInfo } from '../Orders';
import { IPFSEngine } from '../common';
import { ShoppingCartOprator } from '../shoppingCart';

function OrderItem(props) {

  const ipfsEngine = new IPFSEngine();

  const itemCode  = props.record.code;
  const [ record, setRecord ] = useState({});
  const [tm, setTm] = useState(0);

  const processData = async (code, callback)=>{
    const p = await ipfsEngine.promiseIpfsJSON(code);
    callback(p)
  }

  useEffect(()=> {
    const p = processData(itemCode, (p)=>{
      setRecord(p);
      setTm(new Date().getTime());

    });
    
   }, []);

  return (
    <Container  fluid={true}>
      <OrderInfo rec={record} itemCode={itemCode} version={tm}/>
    </Container>
  );
}
export default OrderItem;
