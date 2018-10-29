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
      isReady: false,
      visible:false,
      cardetail:[]
    };
    this.ref = firebaseService.database().ref('SimulateCar/CarDetail');
    this.unsubscribe = null;
  }
  

  logout () {
    this.props.logout()
    setTimeout(() => {
      Actions.reset('login')
    }, 100)
  }

  startmap(){
    if(this.props.CarSelect.Make === undefined &&
      this.props.CarSelect.Model === undefined ){
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
  
  componentDidMount () {
    this.unsubscribe = this.ref.on('value', this.onCollectionUpdate)

  
  
    
  }
componentWillUnmount(){
   clearInterval(this.paring)
}

  
   closeDrawer(){
      this._drawer._root.close()
    };
    openDrawer(){
      this._drawer._root.open()
    };
   
 
paringAuto(){
    return(
      <Text>{this.state.cardetail[3]+' '+this.state.cardetail[5]}</Text>
     
  )
}

onCollectionUpdate = (snapshot) => {
    
  var cardetail = []
   snapshot.forEach(
    function (childSnapshot) {
      var childData = childSnapshot.val()
      cardetail.push(childData)
      this.setState({visible:true})
        setTimeout(() => {
          this.setState({visible:false})
          this.setState({
            cardetail:cardetail
        })
        }, 3000)
    }.bind(this)
    
  )
}
  render () {
  //  console.log(this.state.cardetail)
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
        
       
        <View style={styles.footer1}>
         
          {Platform.OS === 'android' && this.props.connected
            ? <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                
              }}
              >
              <TouchableOpacity onPress={Actions.bluetooth}>
                <Text style={{ fontSize: 19, color: 'black',marginLeft:100 }}>OBD2 is Connected
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
                OBD2 is not connected
                  </Text>
              </TouchableOpacity>
            </View>}
        </View>
            {/*<Text style={styles.title}>Welcome {this.props.user.email}</Text>*/} 
            <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center',alignItems:'center',marginVertical:-30}}>
                {this.state.visible === true ? <ActivityIndicator animating={this.state.visible}/>:null}
                </View>
            <View style={styles.s2}> 
            {Platform.OS === 'android' && this.props.connected
            ?  this.paringAuto()
            :  <Text onPress={Actions.selectmycar} style={{color:'white',fontSize:15}}>
            {this.props.CarSelect.Make === undefined && this.props.CarSelect.Model === undefined ? 
            'Select Car' : this.props.CarSelect.Make + ' ' + this.props.CarSelect.Model}</Text>}
      </View>
     </View>
      <View style={{width:'90%'}}>
          <Card >
          <CardItem >
            <Text> Today </Text>
            </CardItem>
            <CardItem style={{
    left: 0,
    bottom:0,
    right:0,
    flexDirection: 'row',
    }}>
          <View style={{flexDirection:'column',marginHorizontal: 15}}> 
        <Image
          style={{width: 40, height: 40}}
          source={require('./gas.png')}
        />
        <Text style={{}}>38</Text>
        <Text style={{fontSize:15}}>KM/L</Text>    
          </View>
          <View style={{flexDirection:'column',marginHorizontal: 15}}> 
        <Image
          style={{width: 40, height: 40}}
          source={require('./co2.png')}
        />
        <Text style={{}}>69</Text>
        <Text style={{fontSize:15}}>G/KM</Text>
        </View>
        <View style={{flexDirection:'column',marginHorizontal: 15}}> 
        <Image
          style={{width: 40, height: 40,}}
          source={require('./road.png')}
        />
        <Text style={{}}>10</Text>
        <Text style={{fontSize:15}}>KM</Text>
        </View>
        <Image
          style={{width: 40, height: 40}}
          source={require('./arrow.png')}
        />
        </CardItem>
          </Card>
        </View>
        <View style={{width:'90%'}}>
          <Card>
            <CardItem>
              <Text>Do you want to drive?</Text>
              </CardItem>
              <CardItem>
              <Button onPress={this.startmap.bind(this)} style={{height:80,width:250,justifyContent:'center',backgroundColor:'#6a83fb'}} iconLeft>
            <Text>Start Driving</Text>
            <Icon name='paper-plane' />
            </Button>
                </CardItem>
            </Card>
            
          </View>
        
       
      
        <Footer style={{position:'absolute',left: 0,bottom: 0}}>
          <FooterTab>
            <Button vertical onPress={Actions.mycar}>
              <Icon name="ios-contact-outline" />
              <Text>Mycar</Text>
            </Button>
            <Button vertical onPress={Actions.createcar}>
              <Icon name="add-to-list" 
                    type='Entypo'
              />
              <Text>AddCar</Text>
            </Button>
            <Button vertical onPress={Actions.history}>
              <Icon name="md-time" />
              <Text>History</Text>
            </Button>
            <Button vertical onPress={this.logout.bind(this)}>
              <Icon name="ios-log-out" />
              <Text>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
</ImageBackground>

      {/* Rest of the app comes ABOVE the action button component !*/}
     
      </Drawer>
            )
  }
}