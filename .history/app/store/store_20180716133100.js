import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import selectcarReducer from '../reducers/selectcar/selectcarReducer';

const configureStore = () => {
  const middleware = [thunk];
  return createStore(rootReducer, applyMiddleware(...middleware))
}
const middleware = [thunk];
export const store = createStore(rootReducer, applyMiddleware(...middleware));
console.log(store.getState().selectcarReducer.select)


export { configureStore };
