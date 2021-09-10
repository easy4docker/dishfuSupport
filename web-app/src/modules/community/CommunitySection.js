import React , { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { IPFSImg } from '../common';

function CommunitySection(props) {
  const [record, setRecord] = useState(props.record);
  
  useEffect(()=> {
    setRecord(props.record);
  }, []);

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



  return (
    <Container fluid={true} className="border shadow-sm p-2 mt-2 mb-3">
      <p className="float-right" style={{maxWidth:'200px'}}>
          {showPhotoList(recordPhotos(record.data))}
      </p>  
      <div className="p-0">
          <p className="p-0 pl-0 m-1">
            <b>{record.data.name}</b>
            <Link to={'/communityResponse/' + record.publishCode} className="ml-3">Details
              <FontAwesomeIcon size="1x" icon={faArrowCircleRight} className="ml-2"/>
            </Link>
            <Button variant="link" onClick={()=>{ props.parent.deleteRecord(record.publishCode, 'community') }} className="p-0 ml-3">
              <FontAwesomeIcon size="1x" icon={faTrashAlt} /> Delete
            </Button>
            <br/>
            <span><i style={{fontSize:'0.8rem'}}>Record id-: {record.id}, Publisher {record.publisher}</i></span>
          </p>
          {record.data.ingredients &&  (<p className="text-secondary p-1 pl-2 m-0">
            <i className="text-primary">Ingredients:</i> 
            {record.data.ingredients.map((v, k)=>{  return v.text })}
          </p>)}
          {record.data.plates &&  (<p className="text-secondary p-1 pl-2 m-0">
            <i className="text-primary">Plates:</i> 
            {record.data.plates.map((v, k)=>{  return v.text })}
          </p>)}
          {record.data.cooking &&  (<p className="text-secondary p-1 pl-2 m-0">
            <i className="text-primary">Instruction:</i> 
            {record.data.cooking.map((v, k)=>{  return v.text })}
          </p>)}
          <p className="text-secondary p-1 pl-2 m-0">
            <i className="text-primary mr-2">Published:</i> 
            {new Date(record.created).toISOString().slice(0, 19)}
            {/*new Date(record.published).toISOString().slice(0, 19)*/}
            <br/>
            <i className="text-primary">Id:</i> {record.id}
            <br/>
            <i className="text-primary">Price:</i> {record.data.price}  
            <br/>
            <i className="text-primary">Document type:</i> {record.docType}  
          </p>
          {(record.docType === 'plate') &&  
          (<Button onClick={()=>{ props.parent.publishPlate(record) }} className="btn-promary m-1">
             Foodie approve
          </Button>)}

          {(record.docType === 'recipe') && 
            (<Button as={Link} to={'/editPlate/' + record.publishCode + '/new'} className="btn-warning m-1">
              Add my plate
            </Button>)}

          {(record.docType === 'recipe' && !record.data.referenceCode) &&
            (<Button as={Link} to={'/editRecipe/' + record.publishCode + '/new'} className="btn-success m-1">
              Reference to a new recipe
            </Button>)}
      </div>
      <div className="clearfix p-0 m-0"></div>
    </Container>
  );
}
export default CommunitySection;
