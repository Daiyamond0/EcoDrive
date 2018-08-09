import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const edit = (yourcar) => ({
      type: types.EDITCAR,
      value:yourcar
  });


export const EditCar = (uid) => (
    dispatch => {
        const car = []
        firebaseService.database().ref(`user/${uid}/`).once("value",function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                
                    const yourcar = childSnapshot.val();
                    car.push(yourcar)
                    console.log(car) 
                  
              });
             dispatch(mycar(car));       
      }, function(error) { console.log(error); });
    }
);