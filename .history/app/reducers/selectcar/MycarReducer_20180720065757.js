import * as types from '../../actions/selectcar/actionTypes';

const initialState = {
  mycar:[]
  }

  const selectcarReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.YOURDATA:
        return { ...state, mycar: action.value }
   
        default: return state;
    }
  }

export default MycarReducer;