import {useState, useEffect} from 'react';
import {  IPFSEngine } from '../common';

function IpfsDoc(props) {
  const [doc, setDoc] = useState(null);
  const ipfsEngine = new IPFSEngine();
  // const [tm, setTm] = useState(0);
  const tpl = props.tpl;
  useEffect(()=> {
    (async ()=> {
      const x = await ipfsEngine.promiseIpfsJSON(props.ipfs)
      // const x = await loadIpfs();
      setDoc(x);
      // setTm(new Date().getTime());
    })();
  }, []);
  return (!doc)? props.ipfs : tpl({record:doc, className: props.className, style:props.style})
}
export default IpfsDoc;
