import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const mycar = (value) => {
    return {
      type: types.MYCAR,
     value:value
    };
  };

   export const onSelect = (value) => (
    dispatch => {
        dispatch(mycar(value))
    }
)