import { combineReducers } from 'redux';

import routesReducer from '../reducers/routes/routesReducer';
import sessionReducer from '../reducers/session/sessionReducer';
import BlueToothReducer from '../reducers/BlueTooth/BlueToothReducer';
import selectcarReducer from '../reducers/selectcar/selectcarReducer';
import MycarReducer from '../reducers/selectcar/MycarReducer';
import SelectMyCarReducer from '../reducers/selectcar/SelectMyCarReducer';
import EditCarReducer from '../reducers/selectcar/EditCarReducer';
import HomeReducer from '../reducers/home/HomeReducer';
import HistoryReducer from  '../reducers/history/historyReducer';

export default combineReducers({
  routesReducer,
  sessionReducer,
  BlueToothReducer,
  selectcarReducer,
  MycarReducer,
  SelectMyCarReducer,
  EditCarReducer,
  HomeReducer,
  HistoryReducer
});
