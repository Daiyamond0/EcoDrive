import * as types from '../../actions/ฺBluetooth/actionTypes'

const initialState = {
  isEnabled: false,
  discovering: false,
  devices: [],
  unpairedDevices: [],
  connected: false,
  section: 0,
  device: [],
  connecting: false
}

const BlueToothReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ENABLE:
      return { ...state, isEnabled: true }
    case types.DISABLE:
      return { ...state, isEnabled: false }

    case types.DISFALSE:
      return { ...state, discovering: false }
    case types.DISTRUE:
      return { ...state, discovering: true }

    case types.DISCOVER:
      return { ...state, discovering: action.discovering }
    case types.UNPAIREDDEVICES:
      return {
        ...state,
        unpairedDevices: action.unpairedDevices,
        discovering: false
      }

    case types.SEC0:
      return { ...state, section: 0 }
    case types.SEC1:
      return { ...state, section: 1 }

    case types.DEVICES:
      return { ...state, devices: state.devices }
    case types.UPDATEDEVICES:
      return {
        ...state,
        devices: [...state.devices, action.device],
        unpairedDevices: state.unpairedDevices.filter(
          d => d.id !== action.device.id
        )
      }

    case types.CONNECTINGTRUE:
      return { ...state, connecting: true }
    case types.CONNECTDEVICE:
      return {
        ...state,
        device: action.device,
        connected: true,
        connecting: false
      }
    case types.SECTION:
      return { ...state, section: 0 }

    case types.CONNECTEDFALSE:
      return { ...state, connected: false }

    case types.DEVICELIST:
      return { ...state, devices: action.list }
    case types.ISENABLE:
      return { ...state, isEnabled: action.enable }

    case types.SESSIONDEVICE:
      return { ...state, device: state.device }
    case types.SESSIONDEVICENAME:
      return { ...state, device: state.device.name }


    case types.PROMISE:
      return { ...state, isEnabled: action.enable , devices:action.devices }

    case types.CONNECTFALSE:
      return { ...state, connected:false}


    default:
      return state
  }
}

export default BlueToothReducer
