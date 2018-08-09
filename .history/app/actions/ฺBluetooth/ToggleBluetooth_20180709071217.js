import * as types from './actionTypes';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Toast from '@remobile/react-native-toast'


const isenable = () => ({
    type: types.ENABLE
  });
  
  const isdisable = () => ({
    type: types.DISABLE
  });

  export const enable = () => (
    dispatch => {
      BluetoothSerial.enable()
      .then((res) => {
        dispatch(isenable());
    })
      .catch((err) => Toast.showShortBottom(err.message))
    }
);


export const disable = () => (
    dispatch => {
      BluetoothSerial.disable()
      .then((res) => {
        dispatch(isdisable());
    })
      .catch((err) => Toast.showShortBottom(err.message))
    }
);

export const toggleBluetooth = (value) => (
    dispatch => {
        if (value === true) {
            dispatch(enable())
          } else {
            dispatch(disable())
          }
    }
);

export const requestEnable = () => (
  dispatch => {
    BluetoothSerial.requestEnable()
  .then((res) => dispatch(isenable()))
  .catch((err) => Toast.showShortBottom(err.message))
  }
);