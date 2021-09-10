import React , {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { IPFSImg } from '.';

function DisplayRecipe(props) {
  const [record, setRecord] = useState(null);

  const showPhotoList = (photos, g) => {
    return  photos.map((o, k)=>(<IPFSImg ipfs={o.ipfs} isCache={true}  key={k}  
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

  useEffect(()=> { 
    setRecord(props.record);
  },[]);
  const showRecrd = (record) => {
    return (!record) ? '==': (<Container fluid={true} className={props.className} style={props.style}>
        <div className="p-0">
          
            <p className="p-0 pl-0 m-1">
              <b>{record.name}</b>

              <br/>
              <span><i style={{fontSize:'0.8rem'}}>Record id-: {record.id}, Publisher </i></span>
            </p>
            <p className="text-secondary p-1 pl-2 m-0">
              <i className="text-primary">Ingredients:</i> 
              {record.ingredients.map((v, k)=>{  return v.text })}
              <br/>
              {showPhotoList(recordPhotos(record, 'ingredients'))}
            </p>
            <p className="text-secondary p-1 pl-2 m-0">
              <i className="text-primary">Instruction:</i> 
              {record.cooking.map((v, k)=>{  return v.text })}
              <br/>
              {showPhotoList(recordPhotos(record, 'cooking'))}
            </p>
            <p className="text-secondary p-1 pl-2 m-0">
              <span className="text-secondary mr-2">Published:</span>
            </p>
        </div>
        <div className="clearfix p-0 m-0"></div>
      </Container>)
  }
  return showRecrd(record);
}
export default DisplayRecipe;
