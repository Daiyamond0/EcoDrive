import * as types from '../../actions/home/actionTypes'

const initialState = {
  cardetail: [],
  visible: true
}

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CARDETAIL:
      return { ...state, cardetail: action.detail }
    case types.VISIBLETRUE:
      return { ...state, visible: true }
    case types.VISIBLEFALSE:
      return { ...state, visible: false }

    default:
      return state
  }
}

export default HomeReducer
