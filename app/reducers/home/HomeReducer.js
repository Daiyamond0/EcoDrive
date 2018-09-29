import * as types from '../../actions/home/actionTypes'

const initialState = {
  cardetail: [],
  visible: true,
  initialPosition: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  markerPosition: {
    latitude: 0,
    longitude: 0
  },
  origin: {
    latitude: 0,
    longitude: 0
  }
}

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CARDETAIL:
      return { ...state, cardetail: action.detail }
    case types.VISIBLETRUE:
      return { ...state, visible: true }
    case types.VISIBLEFALSE:
      return { ...state, visible: false }
    case types.INITIALPOSITION:
      return {
        ...state,
        initialPosition: {
          latitude: action.positions.coords.latitude,
          longitude: action.positions.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      }
    case types.MARKERPOSITION:
      return {
        ...state,
        markerPosition: {
          latitude: action.positions.coords.latitude,
          longitude: action.positions.coords.longitude
        }
      }
    case types.ORIGIN:
      return {
        ...state,
        origin: {
          latitude: action.positions.coords.latitude,
          longitude: action.positions.coords.longitude
        }
      }

    default:
      return state
  }
}

export default HomeReducer
