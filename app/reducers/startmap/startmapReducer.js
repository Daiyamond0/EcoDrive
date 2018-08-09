import * as types from '../../actions/startmap/actionTypes';
const initialState = {
    distance:[],
    totalfueluse:[],
    }
  
    const startmapReducer = (state = initialState, action) => {
      switch (action.type) {
        // case types.EDITCAR:
        //   return { ...state, distance : action.distance ,totalfueluse:action.totalfueluse }
        
         
          default: return state;
          
      }
      
    }
  
export default startmapReducer;