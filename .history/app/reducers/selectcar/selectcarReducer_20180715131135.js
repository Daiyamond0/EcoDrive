import * as types from '../../actions/selectcar/actionTypes';

const initialState = {
  cardata:[],
  select: undefined,
  }

  const selectcarReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.CARDATA:
        return { ...state, cardata: action.value }
      case types.SELECTMAKE:
        return { ...state, select: state.select }
      case types.VALUEMAKE:
        return { ...state, select: action.make }
      
        default: return state;
    }
  }

export default selectcarReducer;