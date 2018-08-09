import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const edit = (car) => ({
      type: types.EDITCAR,
      value:car
  });


export const EditMyCar = (uid) => (
    dispatch => {
        const car = []
        firebaseService.database().ref(`user/${uid}/`).once("value",function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                    const yourcar = childSnapshot.val();
                    car.push(yourcar)
                    console.log(car)
                  });
             dispatch(edit(car));       
      }, function(error) { console.log(error); });
    }
);