import React , { useState, useEffect } from 'react';
import { Container, Button, Badge  } from 'react-bootstrap';

import { DataStore } from '../../../stores';

import { Link } from "react-router-dom";
import { IPFSImg, Engine } from '../../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

function PlateList(props) {
  const engine = new Engine();
  const [items, setItems] = useState([]);
  const [cnt, setCnt] = useState(0);
  // const [tm, setTm ] = useState(new Date().getTime());

  const showPhotoList = (photos) => {
    return (<span className="clearfix">
        {photos.map((o, k)=>{
          return (<IPFSImg ipfs={o.ipfs} isCache={true} key={k} className="float-left m-1 bg-secondary iconsImage"/>)          
        })}
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
  const deleteRecord = (id, code)=> {
    engine.loadingOn();
    engine.saveLocalRecord({
      type: 'deleteLocal',
      section:code,
      data: {id: id}
    }, (data)=>{
      loadList();
      engine.loadingOff();
    });
  }
  
  const loadList = ()=> {
    const list = DataStore.getState().data.plates;
    const cnt = list.length;
    setItems(list);
    setCnt(cnt);
  //  setTm(new Date().getTime());
  } 
  
  useEffect(()=> { 
      engine.loadStorageData({}, ()=>{
        loadList();
      });
  }, [])

  const showNothing = ()=> (
    <Container fluid={true} className="rounded p-3 message-box grid-bg">
      <h3 className="text-secondary m-3 p-3">There is not plate avaliable.</h3>
    </Container>
  );
  const showList= (cnt)=> {
    return (<Container fluid={true}  className="p-0 m-0">
    {items.map((rec, key) => {
        return !rec ? '' : (
        <Container fluid={true} key={key} className="border shadow-sm p-0 mt-2 mb-3">
          <div className="float-right mr-2 p-2">
            <Button variant="link" as={Link} to={'/editPlate/' + rec.recipeCode + '/'+ rec.id} className="p-0 ml-3">
              <FontAwesomeIcon size="1x" icon={faEdit} /> Edit
            </Button>
            <Button variant="link" onClick={()=>{ deleteRecord(rec.id, 'plates') }} className="p-0 ml-3">
              <FontAwesomeIcon size="1x" icon={faTrashAlt} /> Delete
            </Button>
          </div>
          <b className="float-left p-2 pl-3 pr-3 pb-0 m-0">{rec.name}</b>
          <div className="clearfix p-0 m-0"></div>
          <Container fluid={true}  className="p-0 pl-3 pr-3 pb-1">
            <div>
              <p className="float-right" style={{maxWidth:'200px'}}>
                 {showPhotoList(recordPhotos(rec))}
              </p>  
              <span className="text-primary">Plates:</span>
              {rec.plates.map((v, k)=>{  return v.text })}
              <br/>
              <span className="text-primary">Instruction:</span>
              {rec.cooking.map((v, k)=>{ return v.text })}
            </div>
            {(rec.price) && (<span className="text-primary">Price : ${rec.price}</span>)}
            <div className="clearfix p-1 m-0"></div>
          </Container>
        </Container>);
      })}</Container>);
  }
  return (
    <Container fluid={true} className="content-body p-0 m-0">
        <h4 className="float-left">Plates</h4>
        <Badge className="float-left ml-1 mr-3 alert-primary">{cnt}</Badge>
      <div className="clearfix p-0 m-0"></div>
      {(cnt) ? showList(cnt) : showNothing()}
    </Container>
  );
}
export default PlateList;