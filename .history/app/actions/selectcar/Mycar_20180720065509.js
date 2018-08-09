import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const mycar = (yourcar) => ({
      type: types.YOURCAR,
      value: yourcar
  });


export const MyCar = (uid) => (
    dispatch => {
        firebaseService.database().ref(`CarList/${uid}`).on("value",function(snapshot) {
            snapshot.forEach(function(childSnapshot){
                childSnapshot.forEach(function(childchildSnapshot){
                    const yourcar = childchildSnapshot.val();
                    dispatch(mycar(yourcar));
                })
            })
      }, function(error) { console.log(error); });
    }
);

