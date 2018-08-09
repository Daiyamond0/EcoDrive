import { connect } from 'react-redux';
import { Home } from '../../components/home/home';
// import { Bluetooth } from '../../components/Bluetooth/Bluetooth';

import { logoutUser } from '../../actions/session/actions';
// import { toggleBluetooth } from '../../actions/ฺBluetooth/actions';


const mapStateToProps = state => ({
  routes: state.routes,
  user: state.sessionReducer.user,
  connected:state.BlueToothReducer.connected,
  // isEnabled : state.BlueToothReducer.isEnabled,
});

const mapDispatchToProps = {
  logout: logoutUser,
  // toggleBluetooth : toggleBluetooth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
