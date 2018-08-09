import * as types from '../../actions/selectcar/actionTypes';

const initialState = {
  editcar:[]
  }

  const EditCarReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.EDITCAR:
        return { ...state, editcar : [...state.editcar,action.value]  }
        
       
        default: return state;
        
    }
    
  }

export default EditCarReducer;