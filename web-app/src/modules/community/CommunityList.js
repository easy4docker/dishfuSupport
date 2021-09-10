import React , { useState, useEffect } from 'react';
import { Container, Badge } from 'react-bootstrap';
import { Engine, IPFSEngine  } from '../common';
import { DataStore } from '../../stores';
import  { CommunitySection }  from '.';

function CommunityList(props) {
  const engine = new Engine();
  const ipfsEngine = new IPFSEngine();
  const [items, setItems] = useState([]);
  const [itm, setTm] = useState(new Date().getTime());

  const loadList = ()=> {
    console.log('.load list .' +  new Date().getTime())
    engine.loadingOn();

    engine.DatabaseApi('community', {
      action: 'getList'
    }, (result)=>{
      engine.loadingOff();
      console.log(result.data);
      (async ()=> {
        // setItems(await ipfsEngine.promisePullQ(result.data));
        setItems(await ipfsEngine.promisePullQ(!result.data ? [] : result.data));
        setTm(new Date().getTime());
      })();
     // setItems(await ipfsEngine.promisePullQ(result.data));
    });
  }

  useEffect(()=> { 
    loadList();
  },[]);

  const deleteRecord = (publishCode)=> {
    engine.loadingOn();
    engine.DatabaseApi('community', {
      action : 'delete',
      data : {publishCode: publishCode}
    }, (result)=>{
      engine.loadingOff();
      loadList();
    });
  }
  
  const  publishPlate = (rec) => {
    engine.loadingOn();
    engine.DatabaseApi('menu', {
        action :'add',
        data : {type: 'plate', publishCode: rec.publishCode}
      }, (result)=>{
        console.log(result)
        loadList();
        engine.loadingOff();
      });
  }

  return (
    <Container className="p-3 content-body">
       <h5>My community: <Badge bg="primary" className="alert-primary ml-2">{items.length}</Badge></h5>
      <hr className="border border-danger"/>
      {items.map((v, k)=> {
        return (<CommunitySection key={k} record={v} parent={{deleteRecord: deleteRecord, publishPlate:publishPlate}} />)
      })}
    </Container>
  );
}
export default CommunityList;