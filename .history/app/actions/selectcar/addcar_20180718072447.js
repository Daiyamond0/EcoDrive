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

  export const AddCar = (uid,email,detail) => (
    dispatch => {
        firebaseService.database().ref(`user/${uid}`).set({ 
                  email:email,
                  Cardata:detail
              }).catch((error)=>{
                console.log(error);
              });
        }
    )

// firebase.database().ref('users/003').set({ 
    //       name:'Kittichan',
    //       age:22
    //   }).then(() => {
    //     console.log('Insert !');
    //   }).catch((error)=>{
    //     console.log(error);
    //   });