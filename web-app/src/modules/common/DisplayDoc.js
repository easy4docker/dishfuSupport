import React , {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { IPFSImg } from '.';

function DisplayDoc(props) {
  const [record, setRecord] = useState(null);
  // const [tm, setTm] = useState(0);
  const showPhotoList = (photos, g) => {
    return  photos.map((o, k)=>(
      <IPFSImg ipfs={o.ipfs} isCache={true}  key={k}  
      className="m-1 bg-secondary iconsImage"/>))
  }
  
  const recordPhotos = (rec, group) => {
    let photos = [];

    if (rec[group]) {
      rec[group].map((v)=> {
        photos = [...photos, ...v.photos];
        return '1';
      })
    }
    return photos;
  }

  useEffect(()=> { 
    setRecord(props.record);
    /*
    console.log('===props.record==>>', props)
    setTm(new Date().getTime());
    */
  },[]);
  const showRecrd = (record) => {
    return (!record) ? 'no doc': (<Container fluid={true} className={props.className} style={props.style}>
        <div className="p-0 border alert-success">
            <p className="p-0 pl-0 m-1">
              <b>{record.name}</b>==
              <br/>
              <span><i style={{fontSize:'0.8rem'}}>Record id-: {record.id}, Publisher </i></span>
            </p>
            {['ingredients', 'plates', 'cooking'].map((v1, k1) => (record) && (record[v1]) &&
                (<p className="text-secondary p-1 pl-2 m-0">
                  <i className="text-primary">{v1}:</i> 
                  {record[v1].map((v2, k2)=> v2.text)}
                  <br/>
                  {JSON.stringfy(recordPhotos(record, v1))}
                  =={showPhotoList(recordPhotos(record, v1))}
              </p>))}
        </div>
        <div className="clearfix p-0 m-0"></div>
      </Container>)
  }
  return showRecrd(record);
}
export default DisplayDoc;
