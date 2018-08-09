import * as types from '../../actions/startmap/actionTypes';
const initialState = {
    distance:[],
    totalfueluse:[],
    }
  
    const startmapReducer = (state = initialState, action) => {
      switch (action.type) {
        case types.EDITCAR:
          return { ...state, distance : [...this.state.distance,action.speed.distance.toFixed(1)] ,totalfueluse:[...this.state.totalfueluse,action.speed.totalfueluse]  }
        
         
          default: return state;
          
      }
      
    }
  
export default startmapReducer;