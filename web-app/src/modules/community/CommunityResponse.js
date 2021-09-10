import React , { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Engine } from '../common';
import { DataStore } from '../../stores';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import { useParams, Link } from "react-router-dom";
import { IPFSEngine, IPFSImg } from '../common';

function CommunityResponse(props) {
  const engine = new Engine();
  const ipfsEngine = new IPFSEngine();

  const [record, setRecord] = useState(null);
  // const [tm, setTm] = useState(0);
  const { publishCode } = useParams();

  const promiseIpfsQuery = (Q)=> {
    console.log('Q==>', Q)
    
    return new Promise((resolve, reject) => {
      fetch('http://209.94.90.1/ipfs/' + Q.recipe).then(v=>v.json()).then((data)=> {
        const new_data = {
          id : Q.id,
          recipe : data,
          ipfsCode: Q.recipe,
          published: Q.published,
          publisher: Q.publisher
        } 
        resolve(new_data);
      }).catch(err => { 
        reject('reject_' +  Q.recipe + '-'  + err.message);
      });
   })}

  const showPhotoList = (photos, g) => {
    return  photos.map((o, k)=> (<IPFSImg ipfs={o.ipfs} isCache={true}  key={k}  
      className="m-1 bg-secondary iconsImage"/>))
  }
  const recordPhotos = (rec, group) => {
    let photos = [];
    if (rec[group]) {
      rec[group].map((v)=> {
        photos = [...photos, ...v.photos];
        return true;
      })
    }
    return photos;
  }
/*
  const showPhotoList = (photos) => {
    return (<span className="clearfix">
        {photos.map((o, k)=>(<IPFSImg ipfs={o.ipfs} isCache={true}  key={k}
            className="m-1 float-left  bg-secondary iconsImage"/>)
        )}
    </span>)
  }
  const recordPhotos = (rec) => {
    let photos = [], secs=['plates', 'cooking', 'ingredients'];
    for (let i = 0; i < secs.length; i++) {
      if (rec[secs[i]]) {
        rec[secs[i]].map((v)=> {
          photos = [...photos, ...v.photos];
        })
      }
    }
    return photos;
  }
*/

  useEffect(()=> { 
    console.log(publishCode);
    ipfsEngine.getIpfJsonsAsync(publishCode, (data)=> {

      setRecord(data);
      console.log('IPFSEngine.getIpfJsonsAsync==>',data);
    })


    engine.loadStorageData({}, ()=>{
      const list = DataStore.getState().data.focuses.filter(v=>v.id === publishCode);
      if (list[0]) {
        promiseIpfsQuery(list[0]).then((v)=>{
         // setRecord(v);
         // setTm(new Date().getTime());
        })
      }

    });
  },[]);
  
  const showRecrd = (record) => (<Container fluid={true} className="border shadow-sm p-2 mt-2 mb-3">
      <p>
          {record.name}
      </p> 
      <div className="clearfix p-0 m-0"></div>
    </Container>)

  return (!record)? '==' : (
    <Container className="p-3 content-body">
       <h5>Focus - {publishCode}</h5>
       {JSON.stringify(record)}
       <hr/>
       {showRecrd(record)}
    </Container>
  );
}
export default CommunityResponse;