import * as types from './actionTypes'
import firebaseService from '../../enviroments/firebase'

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
    type: types.VISIBLETRUE
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
