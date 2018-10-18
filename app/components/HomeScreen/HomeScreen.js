import React, { Component } from 'react'
import {
  View,
  Image,
  Switch,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  LayoutAnimation, 
  UIManager} from 'react-native'
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
    
    super();
    this.state ={
 
      status:true
 
    }
    this.state = { onLayoutHeight: 0, modifiedHeight: 0, expanded: false }
 
    if( Platform.OS === 'android' )
    {
      UIManager.setLayoutAnimationEnabledExperimental( true )
}
super(props);
    this.state = {
      isReady: false
    };
  }
  ShowHideTextComponentView = () =>{
 
    if(this.state.status == true)
    {
      this.setState({status: false})
    }
    else
    {
      this.setState({status: true})
    }
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
    
    
changeLayout = () =>
{
    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
 
    if( this.state.expanded === false )
        this.setState({ modifiedHeight: this.state.onLayoutHeight, expanded: true });
    else
        this.setState({ modifiedHeight: 0, expanded: false });
}
getViewHeight( height )
{
    this.setState({ onLayoutHeight: height });
}
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
      
       <View style={styles.footer1}>
         
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
                <Text style={{ fontSize: 19, color: 'black' }}>
                    OBD2 is Connecting
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
                <Text style={{ fontSize: 19, color: 'black' }}>
                    OBD2 is not connect
                  </Text>
              </TouchableOpacity>
            </View>}
            </View>
            {/*<Text style={styles.title}>Welcome {this.props.user.email}</Text>*/}
            <View style={styles.s2}> 
            <Text onPress={Actions.selectmycar} style={{color:'white',fontSize:15}}>{this.props.CarSelect.Make === undefined &&
                this.props.CarSelect.Model === undefined
                ? 'Select Car'
                : this.props.CarSelect.Make + ' ' + this.props.CarSelect.Model}</Text>
      </View>
  
     
 
      
        
        <View style={styles.s1}> 
        <Text style= {{ fontSize: 15, color: "#000", textAlign: 'center', marginLeft:10,marginTop:10 }}> Today </Text>
        <Image
          style={{width: 40, height: 40,position:'absolute',marginTop:50,marginLeft:35}}
          source={require('./gas.png')}
        />
        <Text style={{marginTop:95,marginLeft:40,position:'absolute'}}>38</Text>
        <Text style={{marginTop:115,marginLeft:35,position:'absolute',fontSize:15}}>KM/L</Text>        
        <Image
          style={{width: 40, height: 40,marginTop:50,marginLeft:55}}
          source={require('./co2.png')}
        />
        <Text style={{marginTop:95,marginLeft:125,position:'absolute'}}>69</Text>
        <Text style={{marginTop:115,marginLeft:115,position:'absolute',fontSize:15}}>G/KM</Text>
        <Image
          style={{width: 40, height: 40,marginTop:50,marginLeft:35}}
          source={require('./road.png')}
        />
        <Text style={{marginTop:95,marginLeft:198,position:'absolute'}}>10</Text>
        <Text style={{marginTop:115,marginLeft:196,position:'absolute',fontSize:15}}>KM</Text>
        <Image
          style={{width: 40, height: 40,marginTop:60,marginLeft:40}}
          source={require('./arrow.png')}
        />
        </View>
        <View style={styles.s1}>
        <Text style= {{ fontSize: 15, color: "#000", textAlign: 'center', marginLeft:10,marginTop:10, }}> Do you want to drive? </Text>          
        <View style={style=styles.s3}>
        <Button onPress={this.startmap.bind(this)} style={{height:80,width:250,justifyContent:'center',backgroundColor:'#6a83fb'}} iconLeft>
            <Text>Start Driving</Text>
            <Icon name='paper-plane' />
          </Button>
          </View>
        </View>
        
        <View>
        <Footer>
          <FooterTab>
            <Button vertical onPress={()=> Actions.popTo('home')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={Actions.history}>
              <Icon name="md-time" />
              <Text>History</Text>
            </Button>
            <Button vertical onPress={Actions.selectcar}>
              <Icon active name="contact" />
              <Text>Profile</Text>
            </Button>
            <Button vertical onPress={this.logout.bind(this)}> 
              <Icon name="logout" />
              <Text>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>      
  </View>
      </Drawer>
            )
            
  }
}
