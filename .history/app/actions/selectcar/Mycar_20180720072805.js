import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const mycar = (yourcar) => ({
      type: types.YOURCAR,
      value: yourcar
  });


export const MyCarlist = (uid) => (
    dispatch => {
        firebaseService.database().ref(`user/${uid}/`).on("value",function(snapshot) {
            snapshot.forEach(function(childSnapshot){
                    const yourcar = childSnapshot.val();
                    dispatch(mycar(yourcar));
                console.log('ririr')
            })
      }, function(error) { console.log(error); });
    }
);

export const carlist = () => (
    dispatch => {
        firebaseService.database().ref("CarList").on("value",function(snapshot) {
          const carlist = snapshot.val();
          dispatch(cardata(carlist));
      }, function(error) { console.log(error); });
    }
);