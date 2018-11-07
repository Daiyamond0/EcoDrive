import * as types from './actionTypes'
import firebaseService from '../../enviroments/firebase'

const mycar = (index, value) => {
  return {
    type: types.MYCAR,
    value: value,
    index: index
  }
}
const clearcar = () => {
  return {
    type: types.CLEARCAR,
    
  }
}


export const onSelect = (index, value) => dispatch => {
  dispatch(mycar(index, value))
}

export const clearCarselect = () => dispatch =>{
  dispatch(clearcar())
}
