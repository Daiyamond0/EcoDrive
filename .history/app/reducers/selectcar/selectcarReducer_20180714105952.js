import * as types from '../../actions/selectcar/actionTypes';

const initialState = {
   cardata:{},

  }

  const selectcarReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.CARDATA:
        return { ...state, cardata: action.value }
      
        default: return state;
    }
  }

export default selectcarReducer;