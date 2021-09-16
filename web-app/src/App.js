import React , { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import  Header  from './modules/Header';
import  Footer  from './modules/Footer';
import  Body from './modules/Body';
import { Spinner, Container  } from 'react-bootstrap';
import './App.css';
import { useMediaQuery } from 'react-responsive';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SettingStore } from './stores/';
import { Loading, FingerPrinter, InfoHeader } from './modules/common';
import { ClientForm, SuccessInfo, CrossFromMobile , LinkFromMobile } from './modules/mobileAuth';
import { Engine } from './modules/common';

const App = (props) => {
  const engine = new Engine();

  const fp = new FingerPrinter();
  const [loadReady, setloadReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const screenModel = {
    isDesktopOrLaptop : useMediaQuery({ query: '(min-width: 1224px)'}),
    isBigScreen : useMediaQuery({ query: '(min-width: 1824px)' }),
    isTabletOrMobile : useMediaQuery({ query: '(max-width: 1224px)' }),
    isPortrait : useMediaQuery({ query: '(orientation: portrait)' }),
    isRetina : useMediaQuery({ query: '(min-resolution: 2dppx)' })
  };

  const forceAuth = (callback)=> {
    
    const info = SettingStore.getState().data.authInfo;
    
     if (!info.authcode) {
        setIsAuth(false);
        if (callback) callback();
        return true;
      }
    engine.loadingOn();
    engine.DatabaseApi('admin', {
       action: 'checkTokenAuthCode',
       data: {
          token: info.token, 
          authcode : info.authcode
       }
    }, (result)=>{
       engine.loadingOff();
       if (result.status === 'success') {
          setIsAuth(true);
       } else {
          setIsAuth(false);
          SettingStore.dispatch({
            type : 'signOff'
          });
       }
       if (callback) callback();
    });
 }

  useEffect(() => {
    if (isAuth) {
      forceAuth(); 
    }
    const handleSubscribe = SettingStore.subscribe(() => {
      if (SettingStore.getState()._watcher === 'afterInit') {
        forceAuth(()=> {
          setloadReady(true);
        });
      }
      if (SettingStore.getState()._watcher === 'forceAuth') {
        forceAuth();
      }
      return false;
    }); 

    SettingStore.dispatch({ type: 'loadScreenModel',
      screenModel: screenModel
    });

    return ()=> {
      handleSubscribe();
  }
  }, []);
  // localStorage.clear(); //=====
  const pageLoading = (<InfoHeader comp={(<Spinner animation="border" size="md" className="loading-text"/>)} />);  
  const headNotAuth = (<InfoHeader comp={(<span size="lg"><b>Admin Sign in</b></span>)} />);  
  const pageReady = (
      <Router className="p-0 m-0">
        <Switch>
          <Route exact path="/SuccessInfo/:code/:id">
            <SuccessInfo isAuth={isAuth}/>
          </Route>
          <Route exact path="/LinkFromMobile/:recid/:token">
            <LinkFromMobile isAuth={isAuth}/>
          </Route>
          <Route exact path="/CrossFromMobile/:token">
            <CrossFromMobile isAuth={isAuth}/>
          </Route>
          <Route>
            {(!!isAuth) ? (<Header/>) : headNotAuth}
            <Loading/>
            {(!isAuth) ? (<Container className="p-3"><ClientForm/></Container>) : (<Body/>)}
            <Footer/>
          </Route>
        </Switch>
      </Router>)

    return (!loadReady) ? pageLoading : pageReady;
}
export default App;