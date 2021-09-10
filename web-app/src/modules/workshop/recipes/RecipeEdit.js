import React , { useState, useEffect } from 'react';
import { Container, Form, Button,  Row, Col } from 'react-bootstrap';
import { RecipeSection } from './';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons'
import { DataStore, SettingStore } from '../../../stores';

import { useHistory, useParams } from "react-router-dom";
import { Engine, IPFSEngine, IpfsDoc, DisplayRecipe  } from '../../common';


function RecipeEdit(props) {
  const engine = new Engine();
  const ipfsEngine = new IPFSEngine();
  const [tm, setTm] = useState(new Date().getTime());

  const [record, setRecord] = useState(null);

  const {id, recipeCode} = useParams();
  const history = useHistory();

  useEffect(()=> {
    const engine = new Engine();
    engine.loadStorageData({}, ()=>{
      const idx = DataStore.getState().data.recipes.findIndex((v)=> v.id === id);
      setRecord((id === 'new') ? {
        id : 'new',
        name:'', userId: SettingStore.getState().userId, 
        referenceCode : recipeCode,
        cooking: [{text:'', photos:[]}], 
        ingredients:[{idx:'', text:'', photos:[]}]}
       : (idx === -1) ? false : DataStore.getState().data.recipes[idx]
      );
    });

   }, []);

  const exit = ()=> {
    engine.setOperationRole('foodie');
    history.push('/workshop');
  } 
  const save = async ()=> {
    engine.loadingOn();
    await ipfsEngine.promiseSave(record);
    engine.saveLocalRecord({
      type: 'updateLocal',
      section:'recipes',
      data: record
    }, ()=>{
      engine.loadingOff();
      engine.setOperationRole('foodie');
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
          docType:      'recipe', 
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
  const onNameChange = async (e)=>{
    const rec = record;
    rec.name = e.target.value;
    console.log('rec.name=>', rec.name, rec);
    setRecord(rec);
    console.log('onNameChange=>', e.target.value)
  }
  const referenceRecipe = (code)=> {
    return (!code) ? '': (<Form.Text className="border border-secondary  alert-warning p-2 m-0"
    style={{height:'8rem',overflowY:'scroll', overflowX:'hidden', inline:'block'}}>
      <Form.Text><i>Original Recipe</i></Form.Text>
      <IpfsDoc ipfs={code} tpl={(props)=>(<DisplayRecipe record={props.record} className="p-0 m-0" />)}/>
    </Form.Text>)
  }
  return (record === null) ? 
  (<Container className="p-3 content-body">
    Loading ...
  </Container>)
  : (!record.id) ? 
    (<Container className="p-3 content-body">
      <div className="alert alert-danger">Wrong recipe id -{id}-</div>
    </Container>)
    : 
    (
    <Container className="p-3 content-body">
      <div className="p-3 border border-secondary">
        <Form>
          <div className="m-1 ml-2">
              <b>{(id === 'new') ? "New Foodie's Recip" : (`Foodie's Recip `+ record.id)}</b>
              &nbsp;(By user {record.userId}) {record.recipeCode}
          </div>
          {referenceRecipe(record.referenceCode)}

          <Form.Group controlId="formFileSm" className="p-2 m-1">
            <Form.Control defaultValue={record.name} required placeholder="Input Your Recipe Name" type="textarea" onChange={onNameChange} />
          </Form.Group>

          <div className="m-1 ml-2 mb-3">
              <b>Ingredients</b>
              {record.ingredients.length < 3 && (<Button variant="link" className="ml-3" onClick={addSection('ingredients')}>
                <FontAwesomeIcon size="1x" icon={faPlus}  /> Add a Ingredient
              </Button>)}

              {record.ingredients.map((v, key)=>(<span key={key} >
              <RecipeSection caption={'Section'} key={key}  idx={key} callParent={{syncRec:syncRec('ingredients'), removeSection: removeSection('ingredients')}}
              record = {v}
              isdelete={(record.ingredients.length < 2) ? false : true}/></span>))}

          </div>

          <div className="m-1 ml-2 mt-2">
              <b>Cooking Instruction</b>
              {record.cooking.map((v, key)=>(<span key={key}>
                <RecipeSection caption={''} key={key}  idx={key} callParent={{syncRec:syncRec('cooking'), removeSection: removeSection('cooking')}} 
                record = {v}
                isdelete={(record.cooking.length < 2) ? false : true}/></span>))}   
          </div>

          <Row>
            <Col xs="12" align="center" className="m-1 ml-2">
              <Button  type="button" className="btn btn-primary m-1 mr-3" onClick={save}>
                <FontAwesomeIcon size="1x" icon={faSave} className="m-0" /> Save
              </Button>
              {(record.id !== 'new') && (<Button  type="button" className="btn btn-primary m-1 mr-3" onClick={publish}>
                <FontAwesomeIcon size="1x" icon={faUpload} className="m-0" /> Publish
              </Button>)}

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
export default RecipeEdit;
