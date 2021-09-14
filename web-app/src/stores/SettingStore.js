import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import  FingerprintJS  from '@fingerprintjs/fingerprintjs'

console.log('window.location.hostname-->', window.location.hostname);
const _defaultSetting = {ready: false, loading: {}, screenModel:{}, _watcher:'',
      fp : '',
      data : {signinForm: {}, isAuth: false, authInfo: {}},
      config: {
        apiServer     : 'http://192.168.86.126:3001',
        webServer     : 'http://192.168.86.126:3006',
        sockerServer  : 'http://192.168.86.126:3001/dishFu',
        ipfsServer    :  "//gateway.ipfs.io/ipfs/"
      }
  };

const reducer = (state = _defaultSetting, action) => {
  state._watcher = '';
  switch(action.type) {
    case 'updateSigninForm':
      state.data.signinForm = action.data;
      state._watcher = 'auth';
      saveSettingApi(state.data);
      return state;
    case 'saveAuthInfo':
      state.data.authInfo = action.authInfo;
      state._watcher = 'forceAuth';
      saveSettingApi(state.data);
      return state;
      /*
    case 'forceAuth':
      state.data.isAuth = action.isAuth;
      state._watcher = 'forceAuth';
      saveSettingApi(state.data);
      return state;*/
    /* --- None api action  --> */
    case 'loadScreenModel':
      state.screenModel = action.screenModel;
      return state;

    case 'addLoading':
      state._watcher = 'loading';
      state.loading[action.id] = new Date().getTime();
      return state;
    case 'removeLoading':
      state._watcher = 'loading';
      delete state.loading[action.id];
      return state;

    case 'initStore':
      state.data = action.data;
      state.fp = action.fp;
      state._watcher = 'afterInit';
      return state;

    default:
      return state;
  }
};
const SettingStore = createStore(reducer, composeWithDevTools());

/* --- simulated api ----> */

const loadSettingApi = async (callback) =>{
  const fpPromise = FingerprintJS.load();
  fpPromise.then(fp => fp.get())
  .then(result => {
    // This is the visitor identifier:
    const visitorId = result.visitorId
    const storageName = 'localSettingData';
    let v = _defaultSetting.data;
    try {
      v = (!localStorage.getItem(storageName)) ? _defaultSetting.data : JSON.parse(localStorage.getItem(storageName))
    } catch(e) {}
    if (typeof callback === 'function') {
      callback(v, result.visitorId);
    }
  })

  //setTimeout(
  //  ()=>{

 //   }, 1000
 // );
}
const saveSettingApi = (data) =>{
  setTimeout(
    ()=>{
      localStorage.setItem('localSettingData',  JSON.stringify(data));
    }, 500
  );
}

/* <--- simulated api */
loadSettingApi((data, fp)=>{
  SettingStore.dispatch({
    type: 'initStore',
    data : data,
    fp : fp
  });
});



export default SettingStore;
