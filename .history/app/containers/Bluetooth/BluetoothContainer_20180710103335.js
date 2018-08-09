import { connect } from 'react-redux';
import { Bluetooth } from '../../components/Bluetooth/Bluetooth';


import {discoverUnpaired,cancelDiscovery,sec0,sec1,discovertrue,discoverfalse} from '../../actions/ฺBluetooth/Discover';

import {toggleBluetooth,requestEnable} from '../../actions/ฺBluetooth/ToggleBluetooth';

import {onDevicePress,contedfalse} from '../../actions/ฺBluetooth/ConnectDevice';

const mapStateToProps = state => ({
    discovering : state.BlueToothReducer.discovering,
    section : state.BlueToothReducer.section,
    isEnabled : state.BlueToothReducer.isEnabled,
    unpairedDevices : state.BlueToothReducer.unpairedDevices,
    devices: state.BlueToothReducer.devices,
    device: state.BlueToothReducer.device,
    
});

const mapDispatchToProps = {
    discoverUnpaired: discoverUnpaired,
    cancelDiscovery: cancelDiscovery,
    sec0:sec0,
    sec1:sec1,
    toggleBluetooth:toggleBluetooth,
    requestEnable:requestEnable,
    discoverfalse:discoverfalse,
    discovertrue:discovertrue,
    onDevicePress:onDevicePress,
    contedfalse:contedfalse,
  
    
    
  };

export default connect(mapStateToProps,mapDispatchToProps)(Bluetooth);
