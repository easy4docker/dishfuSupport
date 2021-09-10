import Cache   from './Cache';
import IPFS from 'ipfs-mini';
import { SettingStore } from '../../stores';

class IPFSEngine {
    constructor(prop) {
        this.downloadUri = SettingStore.getState().config.ipfsServer;
        this.uploadSVR = {
            host: 'ipfs.infura.io',
            port:5001,
            protocal: 'https'
        }
        this.ses = ['cooking', 'ingredients', 'plates'];
    }  
    promiseIpfsJSON = async (code)=> {
      return new Promise((resolve, reject) => {
        fetch(this.downloadUri +code)
        .then(res => {
          return res.json()
        })
        .then(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
            console.log('err=>', err);
          }
        )
      });
    } 
    promiseIpfsText = async (code)=> {
      return new Promise((resolve, reject) => {
        fetch(this.downloadUri +code)
        .then(res => {
          return res.text()
        })
        .then(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
            console.log('err=>', err);
          }
        )
      });
    } 
    getIpfsAsync = async (code, callback)=> {
      fetch(this.downloadUri +code)
      .then(res => {
        return res.text()
      })
      .then(
        (data) => {
          callback(data);
        },
        (err) => {
          callback(false);
        }
      )
    } 
    getIpfJsonsAsync = async (code, callback)=> {
      fetch(this.downloadUri +code)
      .then(res => {
        return res.json()
      })
      .then(
        (data) => {
          callback(data);
        },
        (err) => {
          callback(false);
        }
      )
    } 

    promisePullQ = async (Q)=> {
        const promiseQ = [];
        for (let i=0; i < Q.length; i++) {
            promiseQ[i] = new Promise((resolve, reject) => {
            fetch(this.downloadUri +  Q[i].publishCode).then(v=>v.json()).then((data)=> {
                Q[i].data = data;
                resolve(Q[i]);
            }).catch(err => { 
                reject('reject_' +  Q[i].recipe + '-'  + err.message);
            });
            });
        }
        const p = await Promise.all(promiseQ).then((values) => {
            return values;
        }).catch(error => {
            console.error(error.message)
            return [];
        });
        return p;
    }
    promiseSave = async (record)=> {
        const ipfsCache = new Cache((document._cacheExist) ? 'window' : 'localStorage');
        const ipfs = new IPFS({ host: this.uploadSVR.host, port: this.uploadSVR.port, protocol: this.uploadSVR.protocal });

        const promiseQ = [];
        const secs = this.ses;
        
        for (let s=0; s < secs.length; s++) {
          const v = record[secs[s]];
          if (v) {
            for (let i=0; i < v.length; i++) {
              for (let j=0; j < v[i].photos.length; j++) {
                if (v[i].photos[j].base64) {
                  
                  const p = new Promise((resolve, reject) => {
                    ipfs.add(v[i].photos[j].base64).then((code)=> {
                      ipfsCache.setCache(code, v[i].photos[j].base64);
                      v[i].photos[j] = { base64 :'', ipfs : code };
                      resolve('resolve_' + secs[s] + '-' + code);
                    }).catch(err => { 
                      reject('reject_' +  secs[s] + '-'  + err.message);
                    });
                  });
                  promiseQ.push(p);
                }
              }
            }
          }
        }
        const p = await Promise.all(promiseQ).then((values) => {
            return values;
        }).catch(error => {
            console.error(error.message)
            return [];
        });
        return p;
    }
    promisePublish = async (record, callback)=> {
        await this.promiseSave(record);
        const ipfs = new IPFS({ host: this.uploadSVR.host, port: this.uploadSVR.port, protocol: this.uploadSVR.protocal });
        ipfs.add(JSON.stringify(record)).then((code_record)=> {
            callback(code_record);
        });
    }
}

export default IPFSEngine;