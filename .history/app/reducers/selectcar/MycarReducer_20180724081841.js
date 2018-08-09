import * as types from '../../actions/selectcar/actionTypes';

const initialState = {
  mycar:{}
  }

  const MycarReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.YOURCAR:
        return { ...state, mycar : [...state.mycar,action.value] }
       
        default: return state;
    }
  }

export default MycarReducer;