import { connect } from 'react-redux'
import { HomeScreen} from '../../components/HomeScreen/HomeScreen'
// import { Bluetooth } from '../../components/Bluetooth/Bluetooth';

import { logoutUser } from '../../actions/session/actions'
import { getCar,getCurrentLocation } from '../../actions/home/home';



const mapStateToProps = state => ({
  routes: state.routes,
  user: state.sessionReducer.user,
  connected: state.BlueToothReducer.connected,
  visible : state.HomeReducer.visible,
  cardetail:state.HomeReducer.cardetail,
  CarSelect: state.SelectMyCarReducer.CarSelect
})

const mapDispatchToProps = {
  logout: logoutUser,
  getCar : getCar,
  getCurrentLocation:getCurrentLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
