import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const _sections = ['recipes', 'plates', 'orders', 'menus', 'focuses'];
const reducer = (state = {data: {recipes:[], plates:[], orders:[], menus:[], focuses:[]}, LastAction:null}, action) => {
  state.LastAction = action.type;
  const section = (_sections.indexOf(action.section) === -1) ? null : action.section;
  switch(action.type) {
    case 'updateLocal':
    case 'updateApi':
      if (section) {
        if (action.data.id === 'new') {
            action.data.id = new Date().getTime().toString();
            state.data[section].push(action.data);
        } else {
            const idx = state.data[section].findIndex((v)=> v.id === action.data.id);
            state.data[section][idx] = action.data;
        }
        localStorage.setItem('localData', JSON.stringify(state.data));
      }
      return state;
    case 'deleteLocal':
    case 'deleteApi':
      if (section) {
          const idx = state.data[section].findIndex((v)=>  v.id === action.data.id);
          if  (idx !== -1 ) state.data[section].splice(idx, 1);
          localStorage.setItem('localData', JSON.stringify(state.data));
      }
      return state;
  
    case 'publishPlate':
      const idx = state.data.focuses.findIndex((v)=>  v.id === action.data.id);
      if  (idx !== -1 ) {
        delete state.data.focuses[idx].data;
        // state.data.menus = [state.data.focuses[idx]]
        state.data.menus.push(state.data.focuses[idx]);
        state.data.focuses.splice(idx, 1);
      }
      localStorage.setItem('localData', JSON.stringify(state.data));
      return state;

    case 'loadLocal':
    case 'loadApi':
      state.data = action.data;
      return state;
    case 'publish':
      
      action.data.id = new Date().getTime().toString();
      state.data.focuses.push(action.data);
      localStorage.setItem('localData', JSON.stringify(state.data));
      return state;

    case 'addShoppingCartItem':
      state.LastAction = 'shopping';
      ((state)=>{
        const idx = state.data.orders.findIndex((v)=>  v.code === action.data.code);
        if  (idx === -1 ) {
          state.data.orders.push({code: action.data.code, count: 1});
        } else {
          state.data.orders[idx].count = state.data.orders[idx].count + 1;
        }
        localStorage.setItem('localData', JSON.stringify(state.data));
      })(state)
      return state;

    case 'updateShoppingCartItem':
      state.LastAction = 'shopping';
      return ((state)=>{
        const idx = state.data.orders.findIndex((v)=>  v.code === action.data.code);
        if  (idx !== -1 ) {
          state.data.orders[idx].count = (action.data.count >= 0) ? action.data.count : state.data.orders[idx].count;
        } 
        localStorage.setItem('localData', JSON.stringify(state.data));
        return state;
      })(state)

    case 'removeShoppingCartItem':
      state.LastAction = 'shopping';
      return ((state)=>{
        const idx = state.data.orders.findIndex((v)=> v.code === action.data.code);
        if  (idx !== -1 )  state.data.orders.splice(idx, 1);
        localStorage.setItem('localData', JSON.stringify(state.data));
        return state;
      })(state)

    case 'initShoppingCart':
      state.LastAction = 'shopping';
      return ((state)=>{
        state.data.orders = [];
        localStorage.setItem('localData', JSON.stringify(state.data));
        return state
      })(state)

    default:
      return state;
  }
};
const DataStore = createStore(reducer, composeWithDevTools());

export default DataStore;
