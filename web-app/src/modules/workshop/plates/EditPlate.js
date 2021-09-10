import React , { useState, useEffect } from 'react';
import { Form, Button,  Row, Col, Container } from 'react-bootstrap';
import PlateSection from './PlateSection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'

import { DataStore, SettingStore } from '../../../stores';
import { useHistory, useParams } from "react-router-dom";

import { Engine, IPFSEngine, IpfsDoc, DisplayRecipe } from '../../common';

function EditPlate(props) {
  const engine = new Engine();
  const ipfsEngine = new IPFSEngine();
  const history = useHistory();

  const [tm, setTm] = useState(new Date().getTime());
  const [record, setRecord] = useState(null);

  const {id, recipeCode} = useParams();
  if (tm) {}

  useEffect(()=> {
    const engine = new Engine();
    
    engine.loadStorageData({}, ()=>{
      console.log(DataStore.getState().data);
      const idx = DataStore.getState().data.plates.findIndex((v)=> v.id === id);
      setRecord((id === 'new') ? {
        id : 'new',
        recipeCode: recipeCode,
        name:'plate ' + recipeCode, 
        userId: SettingStore.getState().userId, 
        cooking: [{text:'', photos:[]}], 
        plates:[{idx:'', text:'', photos:[]}]}
       : (idx === -1) ? false : DataStore.getState().data.plates[idx]
      );
    });
  }, [])

  const exit = ()=> {
    engine.setOperationRole('supie');
    history.push('/workshop');
  } 
  
  const save = async ()=> {
    engine.loadingOn();
    await ipfsEngine.promiseSave(record);
    console.log("DataStore.getState()", DataStore.getState());

    engine.saveLocalRecord({
      type: 'updateLocal',
      section:'plates',
      data: record
    }, ()=>{
      engine.setOperationRole('supie');
      engine.loadingOff();
      exit();
    });
  }

  const publish = async ()=> {
    engine.loadingOn();
    await ipfsEngine.promiseSave(record);
    ipfsEngine.promisePublish(record,(code)=> {
      engine.DatabaseApi('community', {
        action: 'publish',
        data: {
          publishCode:  code, 
          docType:      'plate', 
          publisher:    SettingStore.getState().fp, 
          authCode:     SettingStore.getState().data.authInfo.authCode
        }
      }, ()=>{
        engine.loadingOff();
        exit();
      } )
    });
  }  
  const removeSection = (section) => {
    return (idx) => {
      if (record[section]) {
        record[section].splice(idx,1)
        setRecord(record);
        resetIdx(section);
        setTm(new Date().getTime())
      }
    }
  }
  const resetIdx = (section) => {
    const set = 'ABCDE';
    if (!record[section]) return true;
    for (let i = 0; i < record[section].length; i++) {
      record[section][i].idx = set[i];
    }
    setRecord(record);
  }
  const addSection = (section)=> {
    return ()=> {
      const rec = record;
      if ((rec[section]) && rec[section].length < 3) {
        rec[section].push({idx:'', text:'', photos:[]});
        resetIdx(section)
        setRecord(rec);
        setTm(new Date().getTime())
      }
    }
  }
  const syncRec = (section)=> {
    return (idx, data) => {
      const rec = record;
      if (rec[section]) {
        rec[section][idx] = data;
        setRecord(rec);
        setTm(new Date().getTime())
      }
    }
  }
  const referenceRecipe = (code)=> {
    return (!code) ? '': (<Form.Text className="border border-secondary  alert-warning p-2 m-0"
    style={{height:'6rem',overflowY:'scroll', overflowX:'hidden', inline:'block'}}>
      <Form.Text><i>Original Recipe</i></Form.Text>
      <IpfsDoc ipfs={code} tpl={(props)=>(<DisplayRecipe record={props.record} className="p-0 m-0" />)}/>
    </Form.Text>)
  }

  const onPriceChange = (e)=> {
    record.price=e.target.value;
    setRecord(record);
  }
  return (record === null) ? 
  (<Container className="p-3 content-body">
    Loading ...
  </Container>)
  : (!record.id) ? 
    (<Container className="p-3 content-body">
      <div className="alert alert-danger">Wrong recipe id -{id}-</div>
    </Container>)
    : (
    <Container className="p-3 content-body">
      <div className="p-3 border border-secondary">
      <Form>
        <Form.Group className="m-1 ml-2 mb-3">
          <Form.Label><b>Plate Design:</b></Form.Label>
          {referenceRecipe(record.recipeCode)}
        </Form.Group>

        <div className="m-1 ml-2 mb-3">
          <b>Plats Description</b> {record.recipeCode}
          {record.plates.length < 3 && (<Button variant="link" className="float-right mr-3 button-link" onClick={addSection('plates')}>
            <FontAwesomeIcon size="1x" icon={faPlus}  /> Add a Plate
          </Button>)}

          {record.plates.map((v, key)=>(<span key={key} >
          <PlateSection caption={'Section'} key={key}  idx={key} callParent={{syncRec:syncRec('plates'), removeSection: removeSection('plates')}}
          record = {v}
          isdelete={(record.plates.length < 2) ? false : true}/></span>))}
        </div>

        <div className="m-1 ml-2"><b>Cooking Instruction</b></div>

        {record.cooking.map((v, key)=>(<span key={key} >
          <PlateSection caption={''} key={key}  idx={key} callParent={{syncRec:syncRec('cooking'), removeSection: removeSection('cooking')}} 
          record = {v}
          isdelete={(record.cooking.length < 2) ? false : true}/></span>))}

        <Form.Group className="m-1 ml-2 mb-3">
          <Form.Label><b>Plate Price:</b></Form.Label>
          <Form.Control defaultValue={record.price}  placeholder="Input price" type="text" onChange={onPriceChange} />
        </Form.Group>

        <Row>
          <Col xs="12" align="center" className="m-1 ml-2">    
            <Button  type="button" className="btn btn-primary m-1 mr-3" onClick={save}>
            <FontAwesomeIcon size="1x" icon={faSave} className="m-0" /> Save
            </Button>
            <Button  type="button" className="btn btn-primary m-1 mr-3" onClick={publish}>
            <FontAwesomeIcon size="1x" icon={faSave} className="m-0" /> Response to Foodie
            </Button>
            <Button className="btn btn-secondary m-1 mr-3" onClick={exit}>
            <FontAwesomeIcon size="1x" icon={faUndo} className="m-0" /> Exit
            </Button> 
          </Col>
        </Row>
      </Form>
      </div>
    </Container>
  );
}
export default EditPlate;
