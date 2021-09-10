
import React , { useState, useEffect, useRef} from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faTrashAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { IPFSImg } from '../../common';

function PlateSectioon(props) {
  const [record, setRecord] = useState(props.record);
  const inputFileHandle = useRef(null); 
  const uploadFile = (e) => {
    inputFileHandle.current.click();
  }

  const handleFileChange = async (e) => {
    const list = [];
    for (let i = 0; i <  e.target.files.length; i++) {
        list.push({base64:await convertBase64(e.target.files[i])});
        e.target.value = null;
    }
    record.photos = [...record.photos, ...list];
    setRecord(record);
    syncRec();
  }

  const removeSection = () => {
    props.callParent.removeSection(props.idx);
  }

  const removePhoto = async (key) => {
    record.photos.splice(key,1);
    setRecord(record);
    syncRec();
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const syncRec = ()=> {
    props.callParent.syncRec(props.idx, record);
  }

  const handleTextChange = async (e) => {
    const rec = record;
    rec.text=e.target.value;
    setRecord(rec);
    syncRec();
  }

  useEffect(()=> {

  }, []);
  
  return (
    <Container fluid="true" className="p-2">
      <InputGroup className="m-2">
        {(record.idx) ? (<InputGroup.Text className="bg-light">{record.idx}</InputGroup.Text>) : ''}
        <Form.Control as="textarea" defaultValue={(!props.record) ? '' : props.record.text} 
                  rows="2" onChange={handleTextChange}/>
      </InputGroup>
      <Form.Control type="file" hidden ref={inputFileHandle} onChange={handleFileChange}/>
      <div className="clearfix p-1">
          <div  className="float-right">
            {props.isdelete && (<Button variant="link" className="ml-3" onClick={removeSection}>
              <FontAwesomeIcon size="1x" icon={faTrashAlt} className="m-0" /> Remove
            </Button>)}

            <Button variant="link" className="ml-3" onClick={uploadFile}>
              <FontAwesomeIcon size="1x" icon={faPaperclip} className="m-0" /> Upload Photo
            </Button>
          </div>
        {record.photos.map((fa, key)=>{
            return (
            <div  key={key}  className="m-1 rounded shadow sahdow-sm alert-secondary bg-light float-left">

              <IPFSImg base64={fa.base64} ipfs={fa.ipfs} isCache={true} className="iconsImage" />

              <FontAwesomeIcon size="2x" icon={faTimesCircle} 
                onClick={()=>removePhoto(key)}
                className="m-1 align-bottom" />
            </div>
            )
          })}
      </div>
    </Container>
  );
}
export default PlateSectioon;
