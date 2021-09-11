import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import  FingerprintJS  from '@fingerprintjs/fingerprintjs'

console.log('window.location.hostname-->', window.location.hostname);
const _defaultSetting = {ready: false, loading: {}, screenModel:{}, _watcher:'',
      fp : '',
      data : {token:'', isAuth: false},
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
    case 'updateToken':
      state.data.token = action.token;
      state._watcher = 'auth';
      saveSettingApi(state.data);
      return state;

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
  const fp = await fpPromise
  const fpRecord = await fp.get()
  setTimeout(
    ()=>{
      const storageName = 'localSettingData';
      let v = _defaultSetting.data;
      try {
        v.visitorId = fpRecord.visitorId;
        v = (!localStorage.getItem(storageName)) ? _defaultSetting.data : JSON.parse(localStorage.getItem(storageName))
      } catch(e) {}
      if (typeof callback === 'function') {
        callback(v);
      }
    }, 200
  );
}
const saveSettingApi = (data) =>{
  setTimeout(
    ()=>{
      localStorage.setItem('localSettingData',  JSON.stringify(data));
    }, 500
  );
}

/* <--- simulated api */


loadSettingApi((data)=>{
  SettingStore.dispatch({
    type: 'initStore',
    data : data
  });
});



export default SettingStore;
