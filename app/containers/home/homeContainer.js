import { connect } from 'react-redux'
import { HomeScreen} from '../../components/HomeScreen/HomeScreen2'
// import { Bluetooth } from '../../components/Bluetooth/Bluetooth';

import { logoutUser } from '../../actions/session/actions'
import { getCar,getCurrentLocation ,CarConnect ,popupvisible,popupinvisible} from '../../actions/home/home';



const mapStateToProps = state => ({
  routes: state.routes,
  user: state.sessionReducer.user,
  connected: state.BlueToothReducer.connected,
  visible : state.HomeReducer.visible,
  cardetail:state.HomeReducer.cardetail,
  CarSelect: state.SelectMyCarReducer.CarSelect,
  carconnect : state.HomeReducer.carconnect
})

const mapDispatchToProps = {
  logout: logoutUser,
  getCar : getCar,
  getCurrentLocation:getCurrentLocation,
  CarConnect:CarConnect,
  popupvisible:popupvisible,
  popupinvisible:popupinvisible
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
