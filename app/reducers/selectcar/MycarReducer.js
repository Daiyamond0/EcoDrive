import * as types from '../../actions/selectcar/actionTypes'

const initialState = {
  mycar: [],
  carinfo:[]
}

const MycarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.YOURCAR:
      return { ...state, mycar: action.value }
      case types.CARINFO:
      return { ...state, carinfo: action.value }

    default:
      return state
  }
}

export default MycarReducer
