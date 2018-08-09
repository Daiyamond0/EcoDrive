import * as types from './actionTypes';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Toast from '@remobile/react-native-toast'


export const devices = () => ({
  type: types.DEVICES
});
export const unpairedDevices2 = device => ({
  type: types.UNPAIRDEVICES2,
  payload:{
    device
  }
});
export const updateDevices = devices =>({
  type: type.UPDATEDEVICES,
  devices:devices
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

export const pairDevice = (device) => (
  dispatch => {
  BluetoothSerial.pairDevice(device.id)
  .then((paired) => {
    if (paired) {
      Toast.showShortBottom(`Device ${device.name} paired successfully`)
      const devices = dispatch(devices())
      devices.push(device)
      this.setState({ devices, unpairedDevices: this.state.unpairedDevices.filter((d) => d.id !== device.id) })
      dispatch(updateDevices(devices))
    } else {
      Toast.showShortBottom(`Device ${device.name} pairing failed`)
    }
  })
  .catch((err) => Toast.showShortBottom(err.message))
  }
);

connect (device) {
  this.setState({ connecting: true })
  BluetoothSerial.connect(device.id)
  .then((res) => {
    Toast.showShortBottom(`Connected to device ${device.name}`)
    this.setState({ device, connected: true, connecting: false })
  })
  .catch((err) => Toast.showShortBottom(err.message))
}
onDevicePress (device) {
  if (this.props.section === 0) {
    this.connect(device)
  } else {
    this.pairDevice(device)
  }
}








