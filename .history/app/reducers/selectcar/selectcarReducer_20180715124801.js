import * as types from '../../actions/selectcar/actionTypes';

const initialState = {
  cardata:[],
  selected: null,
  }

  const selectcarReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.CARDATA:
        return { ...state, cardata: action.value }
      case types.SELECTMAKE:
        return { ...state, selected: state.selected }
      case types.VALUEMAKE:
        return { ...state, selected: action.value }
      
        default: return state;
    }
  }

export default selectcarReducer;