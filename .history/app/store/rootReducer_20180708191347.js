import { combineReducers } from 'redux';

import routesReducer from '../reducers/routes/routesReducer';
import sessionReducer from '../reducers/session/sessionReducer';
import BlueToothReducer from '../reducers/BlueTooth/BlueToothReducer';


export default combineReducers({
  routesReducer,
  sessionReducer,
  BlueToothReducer,
  
});
