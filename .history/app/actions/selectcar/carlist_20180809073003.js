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

const modelcar = () => {
  return{
    type:types.MODELCAR,
  };
}; 

const modelcarlist = (model) =>{
  return{
    type:types.MODELCARLIST,
    model:model
  };
}

const modelcarselect = () => {
  return{
    type:types.MODELCARSELECT
  }
}

const modelcarchange = (modelcar) => {
  return{
    type:types.MODELCARCHANGE,
    modelcar:modelcar
  }
}

const detailmodel = (detail) => {
  return{
    type:types.DETAILMODEL,
    detail:detail
  };
}

const make = (makecar) => {
  return{
    type:types.MAKE,
    makecar:makecar
  }
}

const serie = (seriecars) => {
  return{
    type:types.SERIE,
    seriecar:seriecars,
  }
}



/// ดึงข้อมูลรถทุกคันจาก db 
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

export const MakeChange = (make) =>( 
  dispatch => {
    dispatch(valuemake(make));
    firebaseService.database().ref(`/CarList/${make}`).on("value",function(snapshot) {
      const modellist = snapshot.val();
      dispatch(modelcarlist(modellist));
  }, function(error) { console.log(error); });
  }
)



export const modelselect = () => (
  dispatch => {
    dispatch(modelcarselect());
  }
) 

export const MakeCar = (makecar) => {
  dispatch => {
    dispatch(make(makecar))
    
  }
}

export const Modelchange = (carmodel) =>( 
  dispatch => {
    dispatch(modelcarchange(carmodel));
  }
)

export const SerieCar = (make,model) =>( 
  dispatch => {
    firebaseService.database().ref(`CarList/${make}/${model}`).on('value',function(snapshot){
      const seriecars = snapshot.val();
      dispatch(dispatch(serie(seriecars)))
    }.bind(this), function(error) { console.log(error); });
  }
)




