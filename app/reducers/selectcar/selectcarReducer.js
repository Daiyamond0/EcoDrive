import * as types from '../../actions/selectcar/actionTypes'

const initialState = {
  cardata: [],
  make: undefined,
  model: [],
  modelselect: undefined,
  detailmodel: undefined
}

const selectcarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CARDATA:
      return { ...state, cardata: action.value }
    case types.SELECTMAKE:
      return { ...state, make: state.select }
    case types.VALUEMAKE:
      return { ...state, make: action.make }
    case types.MODELCAR:
      return { ...state, make: state.select }
    case types.MODELCARLIST:
      return { ...state, model: action.model }

    case types.MODELCARSELECT:
      return { ...state, modelselect: state.modelselect }
    case types.MODELCARCHANGE:
      return { ...state, modelselect: action.modelcar }
    case types.DETAILMODEL:
      return { ...state, detailmodel: action.detail }

    case types.MAKE:
      return { ...state, make: action.makecar }
    case types.MODEL:
      return { ...state, modelselect: state.modelselect }

    case types.MAKEMODEL:
      return { ...state, make: action.make, modelselect: action.model }

    case types.RESETMAKE:
      return { ...state, make: undefined ,modelselect:undefined ,model:[]}

    default:
      return state
  }
}

export default selectcarReducer
