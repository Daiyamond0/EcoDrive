import * as types from './actionTypes'
import firebaseService from '../../enviroments/firebase'

const mycar = yourcar => ({
  type: types.YOURCAR,
  value: yourcar
})

const carinfo = item => ({
  type:  types.CARINFO,
  value: item
})


export const MyCarlist = uid => dispatch => {
  const car = []
  firebaseService.database().ref(`user/${uid}/`).once(
    'value',
    function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (childchildSnapshot) {
          const yourcar = childchildSnapshot.val()
          car.push(yourcar)
          // console.log(car)
        })
      })
      dispatch(mycar(car))
    },
    function (error) {
      console.log(error)
    }
  )
}

export const carDetail = (item) => dispatch =>{
  dispatch(carinfo(item))
}
