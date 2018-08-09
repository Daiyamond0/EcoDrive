import * as types from './actionTypes';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Toast from '@remobile/react-native-toast'

 const discoveringTrue = () => ({
    type: types.DISTRUE
  });

const discoveringfalse = () => ({
    type: types.DISFALSE
  });
  
  const discovering = () => ({
    type: types.DISCOVER,
    discovering
  });

  const unpairedDevice = unpairedDevices => ({
    type: types.UNPAIREDDEVICES,
    unpairedDevices
    
    
  });
  export const Section0 = () => ({
    type: types.SEC0,
    
  });
  export const Section1 = () => ({
    type: types.SEC1,
    
  });




  
  




export const discoverUnpaired = () => (
  dispatch => { 
    if (dispatch(discovering())) {
      console.log('text1')
    return false
  } else {
    dispatch(discoveringTrue())
    BluetoothSerial.discoverUnpairedDevices()
    console.log('text')
    .then((unpairedDevices) => {
      dispatch(unpairedDevice(unpairedDevices))
      
    })
    .catch((err) => Toast.showShortBottom(err.message))
   }
  }
)

export const cancelDiscovery  = () =>  (
  dispatch => {
  if (dispatch(discovering())) {
    BluetoothSerial.cancelDiscovery()
    .then(() => {
      dispatch(discoveringfalse())
    })
    .catch((err) => Toast.showShortBottom(err.message))
  }
}
)

export const sec0 = () => (
  dispatch => {
      dispatch(Section0());
  }
);


export const sec1 = () => (
  dispatch => {
      dispatch(Section1());
  }
);

export const discovertrue = () => (
    dispatch =>{
        dispatch(discoveringTrue());
    }
);

export const discoverfalse = () => (
    dispatch =>{
        dispatch(discoveringfalse());
    }
);
