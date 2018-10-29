import * as types from './actionTypes'
import firebaseService from '../../enviroments/firebase'
import { Actions } from 'react-native-router-flux'

const cardetail = detail => {
  return {
    type: types.CARDETAIL,
    detail
  }
}

const visiblefalse = () => {
  return {
    type: types.VISIBLEFALSE
  }
}

const visibletrue = () => {
  return {
    type: types.VISIBLETRUE,
    
  }
}

const initialPosition = positions => {
  return {
    type: types.INITIALPOSITION,
    positions
  }
}

const markerPosition = (positions) => {
  return {
    type: types.MARKERPOSITION,
    positions
  }
}


const origin = (positions) => {
  return {
    type: types.ORIGIN,
    positions
  }
}

const carconnect = (car) => {
  return {
    type: types.CARCONNECT,
    car
  }
}
const popup = () => {
  return {
    type: types.POPUP,
    
  }
}
const popupfalse = () => {
  return {
    type: types.POPUPFALSE,
    
  }
}



export const getCar = () => dispatch => {
  firebaseService.database().ref('SimulateCar/CarDetail').once(
    'value',
    function (snapshot) {
      const detail = snapshot.val()
      dispatch(cardetail(detail))
    },
    function (error) {
      console.log(error)
    }
  )
  dispatch(visibletrue())
  setTimeout(() => {
    dispatch(visiblefalse())
  }, 3000)
}


export const getCurrentLocation = () => dispatch => {
  navigator.geolocation.getCurrentPosition(
    (positions) => {
      console.log(positions)
      dispatch(initialPosition(positions))
      dispatch(markerPosition(positions))
      dispatch(origin(positions))
    },
    error => console.log(error),
    {enableHighAccuracy: false, timeout: 5000},
    
  )
}

export const CarConnect = (CarSelect,simumycar,connected) => dispatch => {
  
  const x = []
  if(CarSelect == []){
    dispatch(carconnect(simumycar[0]))
  } if(simumycar.length == 0){
    dispatch(carconnect(CarSelect))
  } 
  if(simumycar.length == 0 && CarSelect == []){
    dispatch(carconnect(x))
  } 
  
  
}
export const popupvisible = () => dispatch => {
 dispatch(popup())
}
export const popupinvisible = () => dispatch => {
  dispatch(popupfalse())
 }
 
