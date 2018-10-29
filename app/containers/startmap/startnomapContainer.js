import { connect } from 'react-redux'
import { StartNoMap } from '../../components/startmap/startnomap'
import { getDistance } from '../../actions/startmap/actions'
const mapStateToProps = state => ({
  
  user: state.sessionReducer.user,
  carconnect : state.HomeReducer.carconnect,
  popup : state.HomeReducer.popup
})
const mapDispatchToProps = {
  // getDistance:getDistance
}

export default connect(mapStateToProps, mapDispatchToProps)(StartNoMap)