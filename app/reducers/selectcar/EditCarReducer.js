import * as types from '../../actions/selectcar/actionTypes';

const initialState = {
  editcar:[],
  editdetail : [],
  index:[]
  }

  const EditCarReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.EDITCAR:
        return { ...state, editcar : action.value  }
      case types.EDIT:
        return { ...state, editdetail : action.value ,index: action.key }
       
        default: return state;
        
    }
    
  }

export default EditCarReducer;