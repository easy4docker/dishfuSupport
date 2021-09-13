import { SettingStore } from '../../stores';

class Engine {
    constructor(prop) {
        this.id = new Date().getTime();
        this.defaultData = {recipes:[], plates:[], orders:[], menus:[], focuses:[]};
        this.server = SettingStore.getState().config.apiServer;
    }
    loadingOn = ()=> {
        SettingStore.dispatch({type:'addLoading', id: this.id});
    }
    loadingOff = ()=> {
        SettingStore.dispatch({type:'removeLoading', id: this.id});
    }
    fetchApi = async (cfg, callback)=>{
        this.loadingOn();
        const me = this;
        fetch(cfg.url, {}).then((v)=> {
            return v.json()
        }).then((jsonData, err)=>{
            if (jsonData.status === 200) {
                me.loadingOff();
                callback(jsonData.data);
            } else {
                me.loadingOff();
            }
        }).catch((error)=> {
            me.loadingOff();
          });;
    }

    updateSigninForm = (token, socketid, phone)=>{
        SettingStore.dispatch({
            type: 'updateSigninForm',
            data : {
                token: token,
                phone : phone,
                socketid : socketid
            }
        });
    }


     DatabaseApi = (apiCode, dt, callback)=>{
        const me = this;
        fetch(me.server + '/api/' + apiCode, {
            method: 'POST',
            body: JSON.stringify(dt),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(v=>v.json()).then((data)=> {
            callback(data);
        }).catch((err) => {
            callback(err);
        });
     }

}

export default Engine;