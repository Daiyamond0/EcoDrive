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

const valuemake = (make) => {
  return{
    type:types.VALUEMAKE,
    make
  };
}; 

const carmodel = (model) => {
  return {
    type: types.MODEL,
    model : model
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

export const onValueChange = (make) =>( 
  dispatch => {
    dispatch(valuemake(make));
    firebaseService.database().ref("CarList/"+ make ).on("value",function(snapshot) {
      const modelcar = snapshot.val();
      dispatch(carmodel(modelcar));
  }, function(error) { console.log(error); });
    
  }
)

