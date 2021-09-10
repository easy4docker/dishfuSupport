import React , { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import { Container, Alert, Button } from 'react-bootstrap';
import { InfoHeader, Engine, } from '../common';
import { SettingStore } from '../../stores';
// import { Engine, IPFSEngine, IpfsDoc, DisplayRecipe  } from '../../common';

function ScanSignin (props) {
  const { RequestID } = useParams();
  const [ inComeInfo, setIncomeInfo ] = useState({});
  const [ isContinue, setIsContinue ] = useState(true);
  const [ success, setSuccess ] = useState(false);
  const [ isAuth, setIsAuth ] = useState(false);
  const [ cAuth, setCAuth ] = useState(SettingStore.getState().data.authInfo);
  const [ error, setError ] = useState(false);
  
  const engine = new Engine();

  const loadData = ()=> {
    const url = SettingStore.getState().config.apiServer + '/api/application/getAuthUserByAuthCode';
    engine.loadingOn();

    engine.DatabaseApi('auth', {
      action: 'getAuthUserByAuthCode',
      RequestID : RequestID 
    }, (result)=>{
      engine.loadingOff();
      setIncomeInfo(result.data);
    });
  }
  useEffect(() => {
    setIsAuth(SettingStore.getState().data.auth);
    loadData ();
    const handleSubscribe = SettingStore.subscribe(() => {
        if (SettingStore.getState()._watcher === 'auth') {
          // alert(SettingStore.getState()._watcher);
          // SettingStore.getState().auto == true;
          console.log('SettingStore.getState()=AA=>', SettingStore.getState().data);
            setSuccess(true);
          // setloadReady(true);
          //  getAuthInfo();
        }
        return false;
    }); 

    return ()=> {
        handleSubscribe();
    }

  }, []);
  const saveAuthInfo = (data)=> {
    const rec = {...data};
    rec.signInTime = new Date().getTime();
    rec.auth = true;

    SettingStore.dispatch({
        type: 'saveAuthInfo',
        data: rec
    });
  }
  const approveSignin = ()=> {
    saveAuthInfo(inComeInfo);
  }

  const AuthSection = (data) => (!!data) && (<div>
    Auth Code: <b>{data.authCode}</b><br/>
    Address: <b>{data.address}</b><br/>
    Roles: <b>{(!data.roles) ? '' : data.roles.join(',')}</b><br/>
    Sign In Time: <b>{!data.signInTime ? '' : new Date(data.signInTime).toLocaleDateString()}</b><hr/>
  </div>)


const ComingInfoSection = (data) => (!!data) && (<div>
  Auth Code: <b>{data.authCode}</b><br/>
  Address: <b>{data.address}</b><br/>
  Roles: <b>{(!data.roles) ? '' : data.roles.join(',')}</b><br/>
</div>)

  const Frame = (info) => (<Container fluid={true} className="m-0 p-0">
      <InfoHeader comp={'Scan Signin'}/>
      <Container>
        <Alert variant="light mt-3">
        <Alert.Heading>{info.title}</Alert.Heading>
          {info.body}
        </Alert>
      </Container>
    </Container>)

  const errorPage = (<Frame title="Error!" body={error} />);
  const stopContinuePage = (<Frame title="Stop!" body="The scan signin is not going through!" />);
  const successPage = (<Frame title="succeed!" body="The scan signin completed!!" />);

  const itIsAuthedPage = (<Frame title="Your equipment is authorized by" 
      body={(<div className="d-grid gap-2">
          <b>Exist auth:</b>
          {AuthSection(cAuth)}
          <b>Switch to</b>
          {ComingInfoSection (inComeInfo)}
          <Button onClick={approveSignin } className="m-2">
              Continue Anyway
          </Button>
          <Button onClick={ ()=> { setIsContinue(false)} } variant="danger" className="m-2">
              Stop
          </Button>
          </div>)}/>);

  const infoPage = (<Frame title="Coming authentication is" 
      body={(<div className="d-grid gap-2">
          <b>Equempent Setup to</b>
          {ComingInfoSection(inComeInfo)}
          <Button onClick={approveSignin } className="m-2">
              Continue Anyway
          </Button>
          <Button onClick={ ()=> { setIsContinue(false)} } variant="danger" className="m-2">
              Stop
          </Button>
          </div>)}/>);

 

  return  (error) ? errorPage:
        (!isContinue) ? stopContinuePage : 
        (success) ? successPage : (isAuth)? itIsAuthedPage : infoPage
      
}
export { ScanSignin };
