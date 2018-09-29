import React, { Component } from 'react'
import {
  View,
  Image,
  Switch,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native'
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem,Drawer } from "native-base";
import{
  StackNavigator
} from 'react-navigation';
import {SideBar} from "./SideBar/SideBar.js";
import { styles } from './styles.js'
import { Actions } from 'react-native-router-flux'
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator.js'
import { Footer, FooterTab } from 'native-base'
import ActionButton from 'react-native-action-button';
import Toast from '@remobile/react-native-toast'
import firebaseService from '../../enviroments/firebase.js'
import {DrawerNavigator} from 'react-navigation';


export  class HomeScreen extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  

  logout () {
    this.props.logout()
    setTimeout(() => {
      Actions.reset('login')
    }, 100)
  }

  startmap(){
    if(this.props.CarSelect.Make === undefined &&
      this.props.CarSelect.Model === undefined){
        alert('Select Car First')
    }else{
      Actions.push('startmap')
    }
    
  }

  componentWillMount () {
    this.props.getCurrentLocation()
    // BluetoothSerial.on('bluetoothEnabled', () => Toast.showShortBottom('Bluetooth enabled'))
    // BluetoothSerial.on('bluetoothDisabled', () => Toast.showShortBottom('Bluetooth disabled'))
  }
  
  componentDidMount () {}
   closeDrawer(){
      this._drawer._root.close()
    };
    openDrawer(){
      this._drawer._root.open()
    };
    
    
  render () {
   
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()} >
      
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.openDrawer()}>
              <Icon name="menu" />
             
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        
                <ImageBackground
      style={styles.container}
      source={require('../Image/home.png')}
      imageStyle={{ resizeMode: 'cover' }}
      >
        
       
        <View style={styles.footer}>
         
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
              <Drawer/>
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
        </View>
            {/*<Text style={styles.title}>Welcome {this.props.user.email}</Text>*/} 
            
            <View> 
            <Text>CarSelect: {this.props.CarSelect.Make === undefined &&
                this.props.CarSelect.Model === undefined
                ? 'SelectCar'
                : this.props.CarSelect.Make + ' ' + this.props.CarSelect.Model}</Text>
      </View> 
      <ActionButton buttonColor='#b35900'>
          <ActionButton.Item buttonColor='#33cc33' title="Start" onPress={this.startmap.bind(this)} >
            <Icon name="ios-car-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3366ff' title="Mycar" onPress={Actions.selectcar}>
            <Icon name="ios-contact-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#804000' title="History" onPress={Actions.history}>
            <Icon name="md-clipboard" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="rgba(231,76,60,1)" title="Logout" onPress={this.logout.bind(this)}>
            <Icon name="ios-log-out" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
</ImageBackground>

      {/* Rest of the app comes ABOVE the action button component !*/}
     
      </Drawer>
            )
  }
}
