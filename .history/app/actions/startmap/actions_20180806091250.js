import * as types from './actionTypes';


const distance = (speed) => {
    return {
      type: types.DISTANCE,
      speed
    };
  };

  getDistance = (speed) => (
    dispatch => {
        dispatch(distance(speed))
        }
    ).bind(this)
