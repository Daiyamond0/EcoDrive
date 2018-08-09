import * as types from '../../actions/selectcar/actionTypes';
import { store } from '../../store/store';

const initialState = {
  cardata:[],
  select: undefined,
  model : [],
  modelselect : undefined,
  detailmodel : []
  }

  const selectcarReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.CARDATA:
        return { ...state, cardata: action.value }
      case types.SELECTMAKE:
        return { ...state, select: state.select }
      case types.VALUEMAKE:
        return { ...state, select: action.make }
      case types.MODELCAR:
        return { ...state, select: state.select }
      case types.MODELCARLIST:
        return { ...state, model: action.model }

      case types.MODELCARSELECT:
        return { ...state, modelselect: state.modelselect }
      case types.MODELCARCHANGE:
        return { ...state, modelselect: action.modelcar }
      case types.DETAILMODEL:
        return { ...state, detailmodel: action.detail }  

        case types.MAKE:
        return { ...state, select: state.select }  
        case types.MODEL:
        return { ...state, modelselect: state.modelselect }  
      

      case types.MAKEMODEL:
        return { ...state, select: action.make , modelselect:action.model } 
        
        default: return state;
    }
  }

export default selectcarReducer;