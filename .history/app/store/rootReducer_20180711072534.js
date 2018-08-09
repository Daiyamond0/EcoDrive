import { combineReducers } from 'redux';

import routesReducer from '../reducers/routes/routesReducer';
import sessionReducer from '../reducers/session/sessionReducer';
import BlueToothReducer from '../reducers/BlueTooth/BlueToothReducer';
// import selectcarReducer from '../reducers/selectcar/selectcarReducer';

export default combineReducers({
  routesReducer,
  sessionReducer,
  BlueToothReducer,
  
});
