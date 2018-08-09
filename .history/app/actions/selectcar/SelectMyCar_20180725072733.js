import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const mycar = (index,value) => {
    return {
      type: types.MYCAR,
     index:index,
     value:value
    };
  };

   onSelect = (index,value) => (
    dispatch => {
        dispatch(mycar(index,value))
    }
)