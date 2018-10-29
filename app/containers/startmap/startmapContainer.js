import { connect } from 'react-redux'
import { StartMap1 } from '../../components/startmap/startmap1'
import { getDistance } from '../../actions/startmap/actions'
const mapStateToProps = state => ({
  CarSelect: state.SelectMyCarReducer.CarSelect,
  // distance: state.startmapReducer.distance,
  // totalfueluse:state.startmapReducer.totalfueluse,
  initialPosition : state.HomeReducer.initialPosition,
  markerPosition : state.HomeReducer.markerPosition,
  origin : state.HomeReducer.markerPosition,
  user: state.sessionReducer.user,
  carconnect : state.HomeReducer.carconnect
})
const mapDispatchToProps = {
  // getDistance:getDistance
}

export default connect(mapStateToProps, mapDispatchToProps)(StartMap1)
