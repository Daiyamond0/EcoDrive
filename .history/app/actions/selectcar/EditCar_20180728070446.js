import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const editcar = (car) => ({
      type: types.EDITCAR,
      value:car
  });


export const EditMyCar = (uid) => (
    dispatch => {
        const car = []
        firebaseService.database().ref(`user/${uid}/`).once("value",function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                    const yourcar = childSnapshot.key;
                    car.push(yourcar)
                    // console.log(car)
                  });
             dispatch(editcar(car));       
      }, function(error) { console.log(error); });
    }
);

const edit = (edit) => ({
    type: types.EDIT,
    value:edit
});

export const EditDetail = (car) =>(
    dispatch => {
        dispatch(edit(car))
    }
)

