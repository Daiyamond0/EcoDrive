import { createStore, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';


const configureStore = () => {
  const middleware = [thunk];
  return compose(createStore)(rootReducer, applyMiddleware(...middleware))
}




export { configureStore };
