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
import { SignInForm, AdminAuth, CrossFromMobile } from './modules/mobileAuth';
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

  const forceAuth = ()=> {
    const info = SettingStore.getState().data.authInfo;
    
    engine.loadingOn();
    engine.DatabaseApi('admin', {
       action: 'checkTokenAuthCode',
       data: {
          token: info.token, 
          authcode : info.authcode
       }
    }, (result)=>{
       engine.loadingOff();
       setIsAuth((result.status === 'success') ? true : false);
    });
 }

  useEffect(() => {
    const handleSubscribe = SettingStore.subscribe(() => {
      if (SettingStore.getState()._watcher === 'afterInit') {
        setloadReady(true);
        forceAuth();
      }
      if (SettingStore.getState()._watcher === 'forceAuth') {
        forceAuth(); 
      }
      return false;
    }); 

    (async()=>{
     // console.log(await fp.load());
    })();
    SettingStore.dispatch({ type: 'loadScreenModel',
      screenModel: screenModel
    });

    return ()=> {
      handleSubscribe();
  }
  }, []);
  // localStorage.clear(); //=====
  console.log('called localStorage.clear()');

  const pageLoading = (<InfoHeader comp={(<Spinner animation="border" size="md" className="loading-text"/>)} />);  
  const headNotAuth = (<InfoHeader comp={(<span size="lg"><b>Admin Sign in</b></span>)} />);  
  const pageReady = (
      <Router className="p-0 m-0">
        <Switch>
          <Route exact path="/CrossFromMobile/:phone/:token">
            <CrossFromMobile/>
          </Route>
          <Route exact path="/adminAuth/:token/:authcode">
            <AdminAuth/>
          </Route>
          <Route>
            {(!!isAuth) ? (<Header/>) : headNotAuth}
            <Loading/>
            {(!isAuth) ? (<Container className="p-3"><SignInForm/></Container>) : (<Body/>)}
            <Footer/>
          </Route>
        </Switch>
      </Router>)

    return (!loadReady) ? pageLoading : pageReady;
}
export default App;