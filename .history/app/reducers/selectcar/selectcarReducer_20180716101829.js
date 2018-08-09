import * as types from '../../actions/selectcar/actionTypes';

const initialState = {
  cardata:[],
  select: 1,
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
        

        default: return state;
    }
  }

export default selectcarReducer;