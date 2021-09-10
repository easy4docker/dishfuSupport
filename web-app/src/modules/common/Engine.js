import { SettingStore, DataStore } from '../../stores';

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

    setOperationRole = (role)=>{
        SettingStore.dispatch({
            type: 'updateOperationRole',
            operationRole: role
        });
    }

    saveLocalRecord = (dt, callback)=>{
        const me = this;
        me.loadingOn();
        setTimeout(()=>{
            DataStore.dispatch(dt);
            setTimeout(()=> {
                callback(DataStore.getState().data);
                me.loadingOff();
            }, 100)
            
        }, 3000)
     }
     saveLocalRecord = (dt, callback)=>{
        const me = this;
        me.loadingOn();
        setTimeout(()=>{
            DataStore.dispatch(dt);
            setTimeout(()=> {
                callback(DataStore.getState().data);
                me.loadingOff();
            }, 100)
            
        }, 3000)
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

    loadStorageData = (cfg, callback)=>{
        const me = this;
        this.loadingOn();
        let data0 = this.defaultData;
        try {
            data0 =  (!localStorage.getItem('localData')) ? this.defaultData : JSON.parse(localStorage.getItem('localData'));
        } catch (e) {}

        DataStore.dispatch({
            type: 'loadLocal',
            data : data0
        });
        me.loadingOff();
        callback();
        return true;
    }

    getStorageData = (cfg, callback)=>{
        const me = this;
        const data = DataStore.getState();
        me.loadingOff();
        callback(data.data);
        return true;
    }
}

export default Engine;