import * as types from '../../actions/history/actionTypes';

const initialState = {
   trips:[]
  }
  
  const HistoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.TRIPS:
        return { ...state, trips: action.value }
      
      default:
        return state
    }
  }

export default HistoryReducer;