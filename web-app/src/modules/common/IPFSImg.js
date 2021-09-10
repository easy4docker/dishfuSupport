import React , {useState, useEffect} from 'react';
import { IPFSEngine, Cache } from '../common';
import { Image } from 'react-bootstrap';

function IPFSImg(props) {
  const ipfsEngine = new IPFSEngine();

  const ipfsCache = !props.isCache ?  new Cache('') : new Cache((document._cacheExist) ? 'window' : 'localStorage');
  const [base64, setBase64] = useState('');

  const loadIPFS = () => {
    if (ipfsCache.getCache(props.ipfs)) {
      setBase64(ipfsCache.getCache(props.ipfs));
    } else {
      if (!ipfsCache.getIsCaching(props.ipfs)) {
        ipfsCache.setIsCaching(props.ipfs);
        ipfsEngine.getIpfsAsync(props.ipfs, (data)=> {
          if (data) {
            setBase64(data);
            ipfsCache.setCache(props.ipfs, data);
          }
        })  
      } else {
        setTimeout(loadIPFS, 100);
      }
    }
  }
  useEffect(()=> {
    if (props.base64) {
      setBase64(props.base64);
    } else if (props.ipfs) {
      loadIPFS();
    }
  }, []);
  return (<Image src={!!base64 ? base64 : '/imgs/ipfs-caching.jpeg'} alt="uploaded File" 
      className={props.className} style={props.style} />)
}
export { IPFSImg };

