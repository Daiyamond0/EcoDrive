import * as types from './actionTypes'



const trips = item => ({
  type: types.TRIPS,
  value: item
})

export const HistoryTripsDay=(item,index) => dispatch => {
  dispatch(trips(item))
    
}