import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const mycar = (yourcar) => ({
      type: types.YOURCAR,
      value: yourcar
  });


export const MyCarlist = (uid) => (
    dispatch => {
        firebaseService.database().ref(`CarList/${uid}/`).once("value",function(snapshot) {
            snapshot.forEach(function(childSnapshot){
                    const yourcar = childSnapshot.val();
                    dispatch(mycar(yourcar));
                console.log('ririr')
            })
      }, function(error) { console.log(error); });
    }
);

