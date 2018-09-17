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
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import{
  StackNavigator
} from 'react-navigation';
import { styles } from '../home/styles.js'
import { Actions } from 'react-native-router-flux'
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator'
import { Footer, FooterTab } from 'native-base'
import ActionButton from 'react-native-action-button';
import Toast from '@remobile/react-native-toast'
import firebaseService from '../../enviroments/firebase'
import {DrawerNavigator} from 'react-navigation';


export default class HomeScreen extends React.Component {
   
  constructor() {
    super();
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

  componentWillMount () {
    // BluetoothSerial.on('bluetoothEnabled', () => Toast.showShortBottom('Bluetooth enabled'))
    // BluetoothSerial.on('bluetoothDisabled', () => Toast.showShortBottom('Bluetooth disabled'))
  }
  
  componentDidMount () {}
  
  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
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
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor='#b35900'>
          <ActionButton.Item buttonColor='#33cc33' title="Start" onPress={Actions.startmap}>
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
        </Footer>
            {/*<Text style={styles.title}>Welcome {this.props.user.email}</Text>*/} 
            
            <View>
      </View>
</ImageBackground>
      </Container>
            )
  }
}
