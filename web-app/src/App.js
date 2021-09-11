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
import { SignInForm } from './modules/mobileAuth';

const App = (props) => {
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

  useEffect(() => {
    const handleSubscribe = SettingStore.subscribe(() => {
      if (SettingStore.getState()._watcher === 'afterInit') {
        setloadReady(true);
      }
      return false;
    }); 

    (async()=>{
      console.log(await fp.load());
    })();
    
    setTimeout(
      ()=> {
        console.log('==fp.visitorId==', fp.visitorId);
        SettingStore.getState().fp = fp.visitorId;
        console.log(SettingStore.getState().fp);
      }, 1000
    )
    SettingStore.dispatch({ type: 'loadScreenModel',
      screenModel: screenModel
    });

    return ()=> {
      handleSubscribe();
  }
  }, []);
  // localStorage.clear();
  console.log('called localStorage.clear()');

  const pageLoading = (<InfoHeader comp={(<Spinner animation="border" size="md" className="loading-text"/>)} />);  
  const headNotAuth = (<InfoHeader comp={(<span size="lg"><b>Admin Sign in</b></span>)} />);  
  const pageNotAuth = (
    <Router className="p-0 m-0">
      <Switch>
        <Route>
          {headNotAuth}
          <Loading/>
          <Container className="p-3"><SignInForm/></Container>
          <Footer/>
        </Route>
      </Switch>
    </Router>)

  const pageReady = (
      <Router className="p-0 m-0">
        <Switch>
          <Route>
            <Header/>
            <Loading/>
            <Body/>
            <Footer/>
          </Route>
        </Switch>
      </Router>)

    return (!loadReady) ? pageLoading : (!isAuth) ? pageNotAuth : pageReady;
}
export default App;