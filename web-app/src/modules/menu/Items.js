import React , { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import { RestfulAPI } from '../setting';
import { Engine, IPFSEngine } from '../common';

import { MenuItem,  MenuSection } from '../tpl';

function MenuItems(props) {
  const engine = new Engine();
  const ipfsEngine = new IPFSEngine();
  const [items, setItems] = useState([]);
  const [itemsMenu, setItemsMenu] = useState([]);
  const [tm, setTm] = useState(0);

  const loadData = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('menu', {
      action: 'getList'
    }, (result)=>{
      engine.loadingOff();
      (async ()=> {
        // setItems(await ipfsEngine.promisePullQ(result.data));
        console.log('==result.data===>', result);
        setItems(await ipfsEngine.promisePullQ((!result.data) ? []:result.data));
        setTm(new Date().getTime());
      })();
      console.log('menu--list->', result);
    });
      /*
      (async ()=> {
        // setItems(await ipfsEngine.promisePullQ(result.data));
        console.log('==result.data===>', result.data);
        setItems(await ipfsEngine.promisePullQ(result.data));
        setTm(new Date().getTime());
      })();
*/
/*
    engine.loadingOn();
    engine.getApiData({code:'menu'}, (data)=>{
      setItems(data);
      processItems(data);
      engine.loadingOff();
    });
    return true;
*/
  }
  const processItems = async (data)=>{
    const p = await ipfsEngine.promisePullQ(data);
    setItems(p);
  }
  useEffect(()=> { 
    
    engine.loadStorageData({}, ()=>{
      engine.getStorageData({},
        (data)=> {
         //  processData(data.menus);
        }
      );
      loadData();
    });

  }, [])
  return (
    <Container className="p-3 content-body">
      <div className="p-3">
      <h5>Menus This Week</h5>
      {items.map((v, k) => {
        return (<MenuItem key={k} rec={v}/>)
        // return (<MenuSection key={k} rec={v} />);
      })}
      </div>
    </Container>
  );
}
export default MenuItems;
