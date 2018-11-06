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
  Modal
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

let date = new Date()
export  class HomeScreen extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      visible:false,
      cardetail:[], // รถที่เลือกมาจาก simulator
      mycar:[], // รถที่มีทั้งหมดของ  user
      modalVisible: false,
      samecar:[] , //เอารถของ user ที่เหมือนกับ รถ simulator มา
      simumycar:[] //เอารถของ user ที่เหมือนกับ รถ simulator มา
      ,speed: [],
      distance: [],
      sum: 0,
      TodayCO2:[],
      TodayDistance:[],
      TodayFuelrate:[],
      sumCo2:0,
      sumDistance:0,
      sumFuelrate:0
    };
    this.ref = firebaseService.database().ref('SimulateCar/CarDetail');
    this.unsubscribe = null;

    this.speed = firebaseService.database().ref('Speed');
    this.getspeed = null;

    this.loading= null
    this.time=null
  }
  

  logout () {
    this.props.logout()
    setTimeout(() => {
      Actions.reset('login')
    }, 100)
  }

  startmap(){
    // if(this.props.CarSelect.Make === undefined &&
    //   this.props.CarSelect.Model === undefined ){
    //     alert('Select Car First')
    // }
    // else{
    //   Actions.push('startmap')
    // }
    this.props.CarConnect(this.props.CarSelect,this.state.simumycar,this.props.connected)
    if(this.props.carconnect.length == 0 && this.props.connected == true){
      alert('Pls Connect Car')
    }if(this.props.carconnect.length != 0 && this.props.connected == true){
      // this.props.popupinvisible()
      this.speed.off()
      Actions.push('startmap')
      // Actions.refresh('home')
    }
    if(this.props.connected == false){
      alert('Pls Connect Bluetooth')
    }
  }

  componentWillMount () {
   
    this.props.getCurrentLocation()
    var mycar=[]
    const uid = this.props.user.uid
    firebaseService.database().ref(`user/${uid}/`).once(
      'value',
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          childSnapshot.forEach(function (childchildSnapshot) {
            var yourcar = childchildSnapshot.val()
            mycar.push(yourcar.Make +' '+ yourcar.Model)
            this.setState({mycar:mycar})
          
          }.bind(this))
        }.bind(this))
        
      }.bind(this),
      function (error) {
        console.log(error)
      }
    )
 

    
    // BluetoothSerial.on('bluetoothEnabled', () => Toast.showShortBottom('Bluetooth enabled'))
    // BluetoothSerial.on('bluetoothDisabled', () => Toast.showShortBottom('Bluetooth disabled'))
    var TodayCO2 = []
    var TodayDistance = []
    var TodayFuelrate = []
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    if(dd<10) {
      dd='0'+dd;
    } 
    if(mm<10) {
    mm='0'+mm;
    }
    firebaseService.database().ref(`History/${uid}`).once(
      'value',
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var his = childSnapshot.val()
           
            if( his.Date == yyyy+'-'+mm+'-'+dd ){
              TodayCO2.push(parseFloat(his.CO2))
              this.setState({TodayCO2: TodayCO2})
              this.setState({sumCo2: TodayCO2.reduce((a, b) => a + b)})
              TodayDistance.push(his.Distance)
              this.setState({TodayDistance:TodayDistance})
              this.setState({sumDistance:TodayDistance.reduce((a, b) => a + b)})
              TodayFuelrate.push(his.Fuelrate)
              this.setState({TodayFuelrate:TodayFuelrate})
              this.setState({sumFuelrate: TodayFuelrate.reduce((a, b) => a + b / TodayFuelrate.length )})
            }
            
            
        }.bind(this))
        
      }.bind(this),
      function (error) {
        console.log(error)
      }
      
    )
    
    
  }
  
  componentDidMount () {
  
    
      this.unsubscribe = this.ref.on('value', this.onCollectionUpdate)
      

      
          this.getspeed = this.speed.on('value', this.getdataspeed.bind(this))
      
      this.loading = setInterval(()=>{
        if(Platform.OS === 'android' && this.props.connected){
          this.setState({visible:true})
            this.time = setTimeout(() => {
              this.setState({visible:false})
             clearInterval(this.loading)
             this.props.CarConnect(this.props.CarSelect,this.state.simumycar,this.props.connected)
            }, 3000)
            
       }
       
     },2000)

  



    // this.time = setInterval(()=>{
    //  clearInterval(this.time) 
    //   if(this.state.mycar.includes(this.state.cardetail[3]+' '+this.state.cardetail[5]) === false  && this.props.connected === true ){
        
    //    alert('5555')
      
    // }
    // },1000)

  }
componentWillUnmount(){
  clearInterval(this.loading)
}


  
   closeDrawer(){
      this._drawer._root.close()
    };
    openDrawer(){
      this._drawer._root.open()
    };
   

 
 
paringAuto(){
  if(this.state.mycar.includes(this.state.cardetail[3]+' '+this.state.cardetail[5]) === true){
    return(
            <Text style={{color:'white',fontSize:15}}>{this.state.cardetail[3]+' '+this.state.cardetail[5]}</Text>
         )    
  }else{
    return(
      <Text onPress={Actions.createcar} style={{color:'white',fontSize:15}}>
      {this.props.CarSelect.Make === undefined && this.props.CarSelect.Model === undefined ? 
      'Connect Car' : this.props.CarSelect.Make + ' ' + this.props.CarSelect.Model}</Text>
   )
  }
         
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
const uid = this.props.user.uid
 var mycar = []
 var samecar = []
    firebaseService.database().ref(`user/${uid}/`).once(
      'value',
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          childSnapshot.forEach(function (childchildSnapshot) {
            var yourcar = childchildSnapshot.val()
            mycar.push(yourcar.Make +' '+ yourcar.Model)
            this.setState({mycar:mycar})
            // console.log((yourcar.Make +' '+ yourcar.Model) == (cardetail[3]+' '+cardetail[5]))
            if((yourcar.Make +' '+ yourcar.Model).localeCompare(cardetail[3]+' '+cardetail[5]) ==0 ){
              samecar.push(yourcar) 
              this.setState({samecar:samecar})
            }
          }.bind(this))
        }.bind(this))
        
      }.bind(this),
      function (error) {
        console.log(error)
      }
    )
    this.setState({simumycar:[]})
    if(this.state.mycar.includes(cardetail[3]+' '+cardetail[5]) == true){
      var simumycar = []
      
      const uid = this.props.user.uid
      firebaseService.database().ref(`user/${uid}/`).on(
        'value',
        function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            childSnapshot.forEach(function (childchildSnapshot) {
              const yourcar = childchildSnapshot.val()
              if((yourcar.Make +' '+ yourcar.Model).includes(cardetail[3]+' '+cardetail[5]) ==true ){
                  simumycar.push(yourcar)
                  this.setState({simumycar:simumycar})
              }
            
              
            
          }.bind(this))
        }.bind(this))
        }.bind(this),
        function (error) {
          console.log(error)
        }
      )
    }

}

CarConnect(){
  
  if(this.props.carconnect.length == 0 && this.props.connected == true){
    alert('Pls Connect Car')
  }if(this.props.carconnect.length != 0 && this.props.connected == true){
    
    this.props.popupinvisible()
    Actions.push('startnomap')
    this.speed.off()
  }
  if(this.props.connected == false){
    alert('Pls Connect Bluetooth')
  }

}

getdataspeed = (snapshot) => {
    
  var speed = []
   snapshot.forEach(
    function (childSnapshot) {
      var childData = childSnapshot.val()
      speed.push(childData)
    }
    
  )
     this.setState({
    speed:speed
  })
  
  this.getDistance()
  var sum = 0
  const numbers = this.state.distance
  for (const i = 0; i < numbers.length; i++) {
    sum += Number.parseFloat(numbers[i], 10)
    
  }
  this.setState({
    sum: sum / 1000
  })
 
  if(this.state.sum > 0 && this.props.connected == true && this.props.carconnect.length != 0){
    this.props.popupvisible()
    this.speed.off()
    clearInterval(this.getspeedtimmer)
    Actions.push('startnomap')
  }
}
  getDistance () {
    var a = []
   
    this.state.speed.map(
      (data) => {
        a.push(data.distance.toFixed(1))
      
      }
      
    )
    this.setState({ distance: a })
    
    // console.log(a)
    
  }


  render () {
  // console.log(this.state.cardetail[3]+' '+this.state.cardetail[5])
  // console.log(this.props.carconnect.length == 0)
  // console.log(this.state.simumycar)
  // console.log(this.props.CarSelect)
  // console.log(this.props.carconnect)
  // console.log(this.state.sumCo2)
  // console.log(this.state.sumDistance)
  // console.log(this.state.TodayDistance)
  // console.log(this.state.sumFuelrate)
  // console.log(this.state.TodayFuelrate)
 
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
        
       
        
         
          {Platform.OS === 'android' && this.props.connected
            ? <View style={styles.footer2}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                
              }}
              >
              <TouchableOpacity onPress={Actions.bluetooth}>
                <Text style={{ fontSize: 19, color: 'white',marginLeft:100 }}>OBD2 is Connected
                  </Text>
              </TouchableOpacity>
              <Drawer/>
            </View>
            </View>
            :<View style={styles.footer1}> 
            <View
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
            </View>
            </View>}
        
            {/*<Text style={styles.title}>Welcome {this.props.user.email}</Text>*/} 
            <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center',alignItems:'center',marginVertical:-30}}>
                {this.state.visible === true  ? <ActivityIndicator animating={this.state.visible} />:null}
                </View>
            <View style={styles.s2}> 
            {Platform.OS === 'android' && this.props.connected && this.state.visible === false 
            ?  this.paringAuto()
            :  <Text onPress={Actions.createcar} style={{color:'white',fontSize:15}}>
            {this.props.CarSelect.Make === undefined && this.props.CarSelect.Model === undefined ? 
            'Connect Car' : this.props.CarSelect.Make + ' ' + this.props.CarSelect.Model}</Text>}
           
      </View>
     </View>
     { this.state.sumCo2 != 0 &&this.state.sumDistance != 0 &&this.state.sumFuelrate != 0 ? 
      <View style={{width:'90%'}}>
      <TouchableOpacity onPress={Actions.history}>
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
        <Text style={{}}>{parseFloat(this.state.sumFuelrate).toFixed(2) }</Text>
        <Text style={{fontSize:15}}>KM/L</Text>    
          </View>
          <View style={{flexDirection:'column',marginHorizontal: 15}}> 
        <Image
          style={{width: 40, height: 40}}
          source={require('./co2.png')}
        />
        <Text style={{}}>{parseFloat(this.state.sumCo2).toFixed(2)}</Text>
        <Text style={{fontSize:15}}>KG</Text>
        </View>
        <View style={{flexDirection:'column',marginHorizontal: 15}}> 
        <Image
          style={{width: 40, height: 40,}}
          source={require('./road.png')}
        />
        <Text style={{}}>{this.state.sumDistance}</Text>
        <Text style={{fontSize:15}}>KM</Text>
        </View>
        <Image
          style={{width: 40, height: 40}}
          source={require('./arrow.png')}
        />
        </CardItem>
          </Card>
          </TouchableOpacity>
        </View>
        : 
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
          <Text>Not Drive today yet!!</Text>
        </View>
        </CardItem>
          </Card>
        </View>
     }
        <View style={{width:'90%'}}>
          <Card>
            <CardItem>
              <Text>Do you want to drive?</Text>
              </CardItem>
              <CardItem>
                <View style={{flexDirection:'column',flex:1}}>
                  <View>
              <Button onPress={this.startmap.bind(this)} style={{height:40,width:250,justifyContent:'center',backgroundColor:'#6a83fb'}} iconLeft>
            <Text>Start Driving</Text>
            <Icon name='paper-plane' />
            </Button>
            </View>
            <View>
            <Button onPress={this.CarConnect.bind(this)} style={{height:40,width:250,justifyContent:'center',backgroundColor:'#6a83fb'}} iconLeft>
            <Text>Start Driving No map</Text>
            <Icon name='paper-plane' />
            </Button>
              </View>
            </View>
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