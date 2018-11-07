import * as types from '../../actions/selectcar/actionTypes'

const initialState = {
  CarSelect: ''
}

const SelectMyCarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MYCAR:
      return { ...state, CarSelect: action.value }
    case types.CLEARCAR:
      return { ...state, CarSelect: ''}

    default:
      return state
  }
}

export default SelectMyCarReducer
