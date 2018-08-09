import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const add = (id,email,detail) => {
    return {
      type: types.ADD,
      id: id,
      email:email,
      detail:detail
    };
  };