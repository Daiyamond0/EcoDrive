import * as types from '../../actions/selectcar/actionTypes';

const initialState = {
  text:''
  }

  const SelectMyCarReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.MYCAR:
      return { ...state, text : `Selected index: ${action.index} , value: ${Object.entries(action.value)}`  }
   
        default: return state;
    }
  }

export default SelectMyCarReducer;