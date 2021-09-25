import React , { useEffect, useState } from 'react';
import {useParams, useHistory } from "react-router-dom";

import { Container, Alert, Form, Button } from 'react-bootstrap';
import { SettingStore } from '../../stores';
import { InfoHeader, Engine } from '../common';

function LinkFromMobile(props) {
  const history = useHistory();

  const engine = new Engine();
  const [isContinue, setIsContinue] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const params = useParams();
  
  const pullAuthInfo = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('admin', {
       action: 'getAdminSessionRecord',
       data: {
          recid: params.recid, 
          token : params.token
       }
    }, (result)=>{
      
     engine.loadingOff();
     if (result.status === 'failure') {
        setErrorMessage(result.message);
     }  else {
       if (!result.result || !result.result.length) {
          history.push('/SuccessInfo/linkMobile/failure');
       } else {
        
          SettingStore.dispatch({
            type: 'saveAuthInfo',
            authInfo: result.result[0]
          });
          history.push('/SuccessInfo/linkMobile/success'); 
       }
     }
    });
  }
  const continueDo = ()=> {
    setIsContinue(true);
  } 
  const notDo = ()=> {
    setIsContinue(false);
    history.push('/SuccessInfo/linkMobile/keepExist');
  } 
  useEffect(() => {
    setIsContinue(props.isAuth ? false: true);
  }, []);

  useEffect(() => {
    if (isContinue) {
      pullAuthInfo();
    }
  }, [isContinue]);

  const Frame = (info) => (<Container fluid={true} className="m-0 p-0">
  <InfoHeader comp={''}/>
  <Container>
    <Alert variant={!info.variant ? 'light mt-3' :  info.variant} className="text-primary">
    <Alert.Heading>{info.title}</Alert.Heading>
      {info.body}
    </Alert>
  </Container>
  </Container>)

const confirmPage= (<Frame title="" body={(<Container fluid={true}>
  <Form.Text className="text-secondary h4 p-2 text-center mb-3 mt-3">The equipment has been authrized. Would you like to continue?</Form.Text>
  <Button className="btn btn-warning mt-3 mb-2" onClick={continueDo}
          style={{width:"100%"}}>
            Continue anyway
  </Button>
  <Button className="btn btn-info mt-3" onClick={notDo}
          style={{width:"100%"}}>
            No, keep exist one.
  </Button>

</Container>)} />);

  const errorPage = (<Frame title="" body={(<Container fluid={true}>
    <Form.Text className="text-danger h4 p-2"><b>Data Error ! </b><br/>{errorMessage}</Form.Text>
  </Container>)} />);

  return  (errorMessage) ? errorPage : (!isContinue) ? confirmPage : '' 
}
export { LinkFromMobile };