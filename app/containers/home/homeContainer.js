import { connect } from 'react-redux'
import { Home } from '../../components/home/home'
// import { Bluetooth } from '../../components/Bluetooth/Bluetooth';

import { logoutUser } from '../../actions/session/actions'
import { getCar } from '../../actions/home/home';

const mapStateToProps = state => ({
  routes: state.routes,
  user: state.sessionReducer.user,
  connected: state.BlueToothReducer.connected,
  visible : state.HomeReducer.visible,
  cardetail:state.HomeReducer.cardetail,
})

const mapDispatchToProps = {
  logout: logoutUser,
  getCar : getCar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
