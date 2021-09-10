class CacheLocalStorage {
    constructor(lifeTime) {
        this.lifeTime = (!lifeTime) ? 30000 :lifeTime;
    }
    getCachedCode = ()=> {
        let arr = {};
        try {
            const v = localStorage.getItem('cachedCode');
            arr =  (!v) ? {} : JSON.parse(v);
        } catch (e) {}
        return arr;
    }
    setCachedCode = (arr)=> {
        localStorage.setItem('cachedCode', JSON.stringify(arr));
    }
    cleanOld = () => {
        const arr = this.getCachedCode();
        for (let o in arr) {
            if (new Date().getTime() - arr[o] > this.lifeTime) {
                delete arr[o];
                localStorage.removeItem(o);
            }
        }
        this.setCachedCode(arr);
    }
    cleanNotInArr = (code)=>{
        const arr = this.getCachedCode();
        if (!arr[code]) {
            localStorage.removeItem(code);
        }
    }
    setCache = (code, data)=> {
        const arr = this.getCachedCode();
        localStorage.setItem(code, data);
        arr[code] = new Date().getTime();
        this.setCachedCode(arr);
    }
    getCache = (code)=> {
        this.cleanOld();
        this.cleanNotInArr(code);
        return localStorage.getItem(code);
    }

    /* --- iscache section ---*/
    getIsCachedCode = ()=> {
        let arr = {};
        try {
            const v = localStorage.getItem('IsCachedCode');
            arr =  (!v) ? {} : JSON.parse(v);
        } catch (e) {}
        return arr;
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
        localStorage.setItem('isCachedCode', JSON.stringify(arr));
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
export default CacheLocalStorage;
