import {useEffect, useState} from 'react';
import { DataStore } from '../../stores';

function ShoppingCartWatcher (props) {

  useEffect(() => {
    const shppingHandle = DataStore.subscribe(()=> {
      if (DataStore.getState().LastAction === 'shopping') {
        if (props.changed)  {
          props.changed();
        }
      }
    });
    return ()=> {
      shppingHandle();
    }
  }, []);

  return '';
}

export default ShoppingCartWatcher;
