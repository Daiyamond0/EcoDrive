import React, { Component } from 'react';
import { View, Button, Image , Text ,Switch,Platform ,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import {Footer , FooterTab} from 'native-base';
// import BluetoothSerial from 'react-native-bluetooth-serial'
import Toast from '@remobile/react-native-toast'
import firebaseService from '../../enviroments/firebase';
export  class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      visible:false,
      cardetail:[],
    }
    
  }

  logout() {
    this.props.logout();
    setTimeout(() => {
      Actions.reset('login');
    }, 100);
  }

  componentWillMount () {
    // BluetoothSerial.on('bluetoothEnabled', () => Toast.showShortBottom('Bluetooth enabled'))
    // BluetoothSerial.on('bluetoothDisabled', () => Toast.showShortBottom('Bluetooth disabled'))
  }

  componentDidMount(){
   
  }

  getCar(){
    firebaseService.database().ref('SimulateCar/CarDetail').once('value',function(snapshot){
      const detail = snapshot.val();
      this.setState({ cardetail: detail})
    }.bind(this), function(error) { console.log(error); });
    setTimeout(() => {
      this.setState({visible:true})
    }, 3000)
    
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={{}}>
          <Text style={styles.title}>Welcome {this.props.user.email}</Text>
          </View>
          <View style={styles.marginBox}>
            <Button onPress={this.logout.bind(this)} title="Logout"></Button>
          </View>
        </View>

        <View style={{flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:150}}>
          <View style={{margin:40}}>
            <Button onPress={Actions.startmap} title="Start"></Button>
          </View>
          <View style={{margin:40}}>
            <Button onPress={Actions.selectcar} title="Select Car"></Button>
          </View>
          <View style={{margin:40}}>
            <Button onPress={Actions.history} title="Histoty"></Button>
          </View>
        </View>
        <View style={{
        flexDirection: 'row',
        flex:1}}>
            <View>
                <Button title='Pair' onPress={this.getCar.bind(this)}/>
            </View>
           
              <View>
                { this.state.cardetail.Make === undefined && this.state.cardetail.Model === undefined ?  null: <Text>{this.state.cardetail.Make+' '+this.state.cardetail.Model}</Text>}
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
            ? (
          <View  style={{flex:1,flexDirection: 'row',
        justifyContent: 'center',alignItems: 'center',}}>
              <TouchableOpacity onPress={Actions.bluetooth}>
                <Text  style={{ fontSize: 12, color: '#FFFFFF' }}>
                  Connecting
                </Text>
                </TouchableOpacity>
              </View>
            ) : 
            <View  style={{flex:1,flexDirection: 'row',
        justifyContent: 'center',alignItems: 'center',}}>
              <TouchableOpacity onPress={Actions.bluetooth}>
                <Text  style={{ fontSize: 12, color: '#FFFFFF' }}>
                Not Connecting
                </Text>
                </TouchableOpacity>
              </View>
            }
              
        </Footer>
       

      </View>
    );
  }
}
