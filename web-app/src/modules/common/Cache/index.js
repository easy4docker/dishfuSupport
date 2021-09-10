import CacheLocalStorage from './CacheLocalStorage';
import CacheWindow from './CacheWindow';

class Cache {
    constructor(code, lifeTime) {
        switch (code.toLowerCase()) {
            case 'localstorage': 
                this.Ins = new CacheLocalStorage(lifeTime);
                break;
            case 'window': 
                this.Ins = new CacheWindow(lifeTime);
                break;
            default:
                this.Ins = null;
        }
    }
    setCache = (code, data)=> {
        if (this.Ins) this.Ins.setCache(code, data);
    }
    getCache = (code)=> {
        return (!this.Ins) ? null : this.Ins.getCache(code);
    }
    
    setIsCaching = (code)=> {
        if (this.Ins) this.Ins.setIsCaching(code);
    }

    getIsCaching = (code)=> {
        return (!this.Ins) ? null : this.Ins.getIsCaching(code);
    }
}
export default Cache;
