import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase';

const cardata = (cardata) => {
    return {
      type: types.CARDATA,
      value: cardata
    };
  };

const selectmake = () => {
  return{
    type:types.SELECTMAKE
  };
}; 

const valuemake = (value) => {
  return{
    type:types.VALUEMAKE,
    value
  };
}; 


export const carlist = () => (
    dispatch => {
        firebaseService.database().ref("CarList").on("value",function(snapshot) {
          const carlist = snapshot.val();
          dispatch(cardata(carlist));
      }, function(error) { console.log(error); });
    }
);

export const selectmakecar = () => (
    dispatch => {
      dispatch(selectmake());
    }
)

export const onValueChange = (value) =>( 
  dispatch => {
    dispatch(valuemake(value));
  }
)

