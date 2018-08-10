import React, { Component } from 'react'
import {
  View,
  Button,
  Image,
  Text,
  Switch,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'
import { Actions } from 'react-native-router-flux'
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator'
import { Footer, FooterTab } from 'native-base'

import Toast from '@remobile/react-native-toast'
import firebaseService from '../../enviroments/firebase'
export class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true,
      cardetail: []
    }
  }

  logout () {
    this.props.logout()
    setTimeout(() => {
      Actions.reset('login')
    }, 100)
  }

  componentWillMount () {
    // BluetoothSerial.on('bluetoothEnabled', () => Toast.showShortBottom('Bluetooth enabled'))
    // BluetoothSerial.on('bluetoothDisabled', () => Toast.showShortBottom('Bluetooth disabled'))
  }

  componentDidMount () {}

  showCar () {
    if (this.props.visible === true) {
      return (
        <View>
          <ActivityIndicator animating={this.props.visible} />
        </View>
      )
    }
    return (
      <View>
        <Text>
          {this.props.cardetail.Make + ' ' + this.props.cardetail.Model}
        </Text>
      </View>
    )
  }

  render () {
    console.log(this.props.cardetail.Make)
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{}}>
            <Text style={styles.title}>Welcome {this.props.user.email}</Text>
          </View>
          <View style={styles.marginBox}>
            <Button onPress={this.logout.bind(this)} title='Logout' />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 150
          }}
        >
          <View style={{ margin: 40 }}>
            <Button onPress={Actions.startmap} title='Start' />
          </View>
          <View style={{ margin: 40 }}>
            <Button onPress={Actions.selectcar} title='Select Car' />
          </View>
          <View style={{ margin: 40 }}>
            <Button onPress={Actions.history} title='Histoty' />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1
          }}
        >
          <View>
            <Button title='Pair' onPress={this.props.getCar.bind(this)} />
          </View>

          <View>
            {this.props.cardetail.Make === undefined &&
              this.props.cardetail.Model === undefined
              ? null
              : this.showCar()}
          </View>

        </View>
        <Footer>
          {/* <FooterTab style={{alignItems:'center'}}>
            <View style={styles.topBar}>
              <Text style={styles.heading}>Bluetooth</Text>
                {Platform.OS === 'android'
                    ? (
                    <View style={styles.enableInfoWrapper}>
                        <Text style={{ fontSize: 12, color: '#FFFFFF' }}>
                          {this.props.isEnabled ? 'disable' : 'enable'}
                        </Text>
                        <Switch
                        onValueChange={this.props.toggleBluetooth.bind(this)}
                        value={this.props.isEnabled} />
                    </View>
                ) : null}
              </View>

          </FooterTab> */}
          {Platform.OS === 'android' && this.props.connected
            ? <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
              <TouchableOpacity onPress={Actions.bluetooth}>
                <Text style={{ fontSize: 12, color: '#FFFFFF' }}>
                    Connecting
                  </Text>
              </TouchableOpacity>
            </View>
            : <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
              <TouchableOpacity onPress={Actions.bluetooth}>
                <Text style={{ fontSize: 12, color: '#FFFFFF' }}>
                    Not Connecting
                  </Text>
              </TouchableOpacity>
            </View>}

        </Footer>

      </View>
    )
  }
}
