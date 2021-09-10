class CacheWindow {
    constructor(lifeTime) {
        this.lifeTime = (!lifeTime) ? 60000 :lifeTime;
    }
    getCachedCode = ()=> {
        return (!window.document._cachedCode) ? {} : window.document._cachedCode;
    }
    setCachedCode = (arr)=> {
        window.document._cachedCode = arr;
    }
    cleanOld = () => {
        const arr = this.getCachedCode();
        for (let o in arr) {
            if (new Date().getTime() - arr[o] > this.lifeTime) {
                delete arr[o];
                delete window.document['__'+o];
            }
        }
        this.setCachedCode(arr);
    }
    setCache = (code, data)=> {
        const arr = this.getCachedCode();
        window.document['__'+code] = data;
        arr[code] = new Date().getTime();
        this.setCachedCode(arr);
    }
    getCache = (code)=> {
        this.cleanOld();
        return window.document['__'+code];
    }

    /* --- iscache section ---*/
    getIsCachedCode = ()=> {
        return (!window.document._isCachedCode) ? {} : window.document._isCachedCode;
    }

    cleanOldIsCache = () => {
        const arr = this.getIsCachedCode();
        for (let o in arr) {
            if (new Date().getTime() - arr[o] > this.lifeTime) {
                delete arr[o]; 
            }
        }
        this.setIsCachedCode(arr);
    }

    setIsCachedCode = (arr)=> {
        window.document._isCachedCode = arr;
    }
    
    setIsCaching = (code)=> {
        const arr = this.getIsCachedCode();
        arr[code] = new Date().getTime();
        this.setIsCachedCode(arr);
    }
    getIsCaching = (code)=> {
        this.cleanOldIsCache();
        const arr = this.getIsCachedCode();
        return (arr[code]) ? true : false;
    }
}
export default CacheWindow;
