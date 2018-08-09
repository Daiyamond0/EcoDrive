import * as types from './actionTypes';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Toast from '@remobile/react-native-toast'


export const devices = () => ({
  type: types.DEVICES
});
export const unpairedDevices2 = device => ({
  type: types.UNPAIRDEVICES2,
  device: device
  
});
export const updateDevices = devices =>({
  type: types.UPDATEDEVICES,
  devices:devices
});

 const connectingTrue = () =>({
  type: types.CONNECTINGTRUE
});
 const connectingFalse = () =>({
  type: types.CONNECTINGFALSE
});
 const connectedTrue = () =>({
  type: types.CONNECTEDTRUE
});
 const connectedFalse = () =>({
  type: types.CONNECTEDFALSE
});


 const connectdevice= device =>({
  type: types.CONNECTDEVICE,
  device:device
});

const section = () =>({
  type:types.SECTION,
  section:section
});




export const pairDevice = (device) => (
  dispatch => {
  BluetoothSerial.pairDevice(device.id)
  .then((paired) => {
    if (paired) {
      Toast.showShortBottom(`Device ${device.name} paired successfully`)
      const devices = dispatch(devices())
      devices.push(device)
      dispatch(updateDevices(devices))
      dispatch(unpairedDevices2())
    } else {
      Toast.showShortBottom(`Device ${device.name} pairing failed`)
    }
  })
  .catch((err) => Toast.showShortBottom(err.message))
  }
);

export const connect = (device) =>(
  dispatch => {
  dispatch(connectingTrue())
  BluetoothSerial.connect(device.id)
  .then((res) => {
    Toast.showShortBottom(`Connected to device ${device.name}`)
    dispatch(connectdevice(device))
  })
  .catch((err) => Toast.showShortBottom(err.message))
  }
);

export const onDevicePress = (device) => (
 dispatch => {
  if (dispatch(section()) === 0) {
    dispatch(connect(device))
  } else {
    dispatch(pairDevice(device))
  }
}
);








