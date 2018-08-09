import { combineReducers } from 'redux';

import routesReducer from '../reducers/routes/routesReducer';
import sessionReducer from '../reducers/session/sessionReducer';
import BlueToothReducer from '../reducers/BlueTooth/BlueToothReducer';
import selectcarReducer from '../reducers/selectcar/selectcarReducer';
import MycarReducer from '../reducers/selectcar/MycarReducer'

export default combineReducers({
  routesReducer,
  sessionReducer,
  BlueToothReducer,
  selectcarReducer,
  MycarReducer
});
