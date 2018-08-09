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
        
                
                    const yourcar = snapshot.val();
                    // car.push(yourcar)
                    // console.log(car) 
                  
             
             dispatch(edit(yourcar));       
      }, function(error) { console.log(error); });
    }
);