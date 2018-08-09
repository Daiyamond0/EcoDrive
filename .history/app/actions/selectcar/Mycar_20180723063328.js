import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const mycar = (yourcar) => ({
      type: types.YOURCAR,
      value:yourcar
  });


export const MyCarlist = (uid) => (
    dispatch => {
        firebaseService.database().ref(`user/${uid}/`).once("value",function(snapshot) {
                    const yourcar = snapshot.val();
                    dispatch(mycar(yourcar));
      }, function(error) { console.log(error); });
    }
);

