import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  ListView,
  Button,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,

} from 'react-native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ListItem,
  List,
  Picker,
  Footer,
  FooterTab,
  Container
} from 'native-base'
import { Actions } from 'react-native-router-flux'
import { Dialog } from 'react-native-simple-dialogs';
import firebaseService from '../../enviroments/firebase'
const { height } = Dimensions.get('window')

export class MyCar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      carselected: [],
      visible:false,
      count:[]
    }
  }

  componentWillMount () {
    const uid = this.props.user.uid
    this.props.MyCarlist(uid)
    this.props.EditMyCar(uid)
   
    var count = []
    firebaseService.database().ref(`user/${uid}/`).once(
      'value',
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
       const x = childSnapshot.key
      count.push(x)
      this.setState({count:count})
    }.bind(this))
      }.bind(this),
      function (error) {
        console.log(error)
      }
    )
  }

  onValueChange (value) {
    this.setState({
      carselected: value
    })
  }
  state = {
    screenHeight:0,
  };
  onContentSizeChange = (contentWidth, contentHeight)=>{
    this.setState({screenHeight:contentHeight});
  }
  MycarDetail(item){
    this.props.carDetail(item)
    Actions.push('mycardetail')
  }
  editCar (item, key) {
    this.props.EditDetail(item, key)
    Actions.push('edit')
  }
  removeCar (car) {
   console.log(JSON.stringify(car))
    const x = Object.values(this.state.count)[car] /// ตำแหน่ง uid ที่จะลบ
    const uid = this.props.user.uid
    console.log(x)
    firebaseService.database().ref(`user/${uid}/`).child(x).remove()
    
    Actions.replace('mycar')
    Actions.refresh('mycar')
    
  }
  deletecar(car){
    
   
  }

  render () {
    // console.log(this.props.mycar)
    //  console.log(Object.values(this.props.mycar)[1])
    const scrollEnabled = false;
    return (
      <View style={styles.mainviewStyle}>
         <View style={{height:80,backgroundColor:'yellow',justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20,color:'black'}}>Hi, {this.props.user.email} These are your cars</Text>
         </View>
      <ScrollView >   
        <View>
     
          <List
            dataArray={Object.values(this.props.mycar)}
            renderRow={(item ,index,key)=> {
              
              return (
                  <ListItem onPress={()=>this.MycarDetail(item)}>
                    <View style={{marginTop:20,width:320,height:250,backgroundColor:'white',alignSelf:'center',borderRadius:7}}>
                      <View style={{flexDirection:'row',marginTop:15}}>
                        <View>
                          <Text style={{marginLeft:15,fontSize:20,color:'black',paddingRight:30}}>{item.Nickname}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <TouchableOpacity onPress={() => this.editCar(item, key)}>
                          {/* <TouchableOpacity onPress={Actions.editcar}> */}
                            <Image
                                style={{width: 30, height: 30,alignItems:'center',paddingLeft:20}}
                                source={require('../Image/edit.png')}
                                  
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => this.removeCar(key)} key={index}>
                            <Image
                                style={{width: 30, height: 30,alignItems:'center',paddingLeft:5}}
                                source={require('../Image/cross.png')}
                                  
                            />
                          </TouchableOpacity>
                        </View>    
                        
                      </View>
                      <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
                      <View style={{justifyContent:'center',width:90,height:40,backgroundColor:'white',borderColor:'#6a83fb',borderWidth:0.5,borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                      <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>Brand</Text>
                      </View>
                      <View style={{justifyContent:'center',width:180,height:40,backgroundColor:'#6a83fb',borderColor:'#6a83fb',borderWidth:0.5,borderTopRightRadius:5,borderBottomRightRadius:5}}>
                      <Text style={{fontSize:13,color:'white',marginLeft:10}}>{item.Make}</Text>
                      </View>
                      </View>
                      <View style={{flexDirection:'row',marginTop:5,alignSelf:'center'}}>
                      <View style={{justifyContent:'center',width:90,height:40,backgroundColor:'white',borderColor:'#6a83fb',borderWidth:0.5,borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                      <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>Model</Text>
                      </View>
                      <View style={{justifyContent:'center',width:180,height:40,backgroundColor:'#6a83fb',borderColor:'#6a83fb',borderWidth:0.5,borderTopRightRadius:5,borderBottomRightRadius:5}}>
                      <Text style={{fontSize:13,color:'white',marginLeft:10}}>{item.Model}</Text>
                      </View>
                      </View>
                      <View style={{flexDirection:'row',marginTop:5,alignSelf:'center'}}>
                      <View style={{justifyContent:'center',width:90,height:40,backgroundColor:'white',borderColor:'#6a83fb',borderWidth:0.5,borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                      <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>Max Speed</Text>
                      </View>
                      <View style={{justifyContent:'center',width:180,height:40,backgroundColor:'#6a83fb',borderColor:'#6a83fb',borderWidth:0.5,borderTopRightRadius:5,borderBottomRightRadius:5}}>
                      <Text style={{fontSize:15,color:'white',marginLeft:10}}>{item.MaximumSpeed} km/h</Text>
                      </View>
                      </View>
                      <View style={{flexDirection:'row',marginTop:5,alignSelf:'center'}}>
                      <View style={{justifyContent:'center',width:90,height:40,backgroundColor:'white',borderColor:'#6a83fb',borderWidth:0.5,borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                      <Text style={{fontSize:13,color:'#6a83fb',marginLeft:15}}>FuelType</Text>
                      </View>
                      <View style={{justifyContent:'center',width:180,height:40,backgroundColor:'#6a83fb',borderColor:'#6a83fb',borderWidth:0.5,borderTopRightRadius:5,borderBottomRightRadius:5}}>
                      <Text style={{fontSize:13,color:'white',marginLeft:10}}>{item.FuelType.FuelType}</Text>
                      </View>
                      </View>
                    </View>
                    {/* <View style={{flexDirection:'column'}}>
                    <View>
                    <Text style={{fontSize:24}}>{item.Make}  {item.Model}</Text>
                    </View> 
                    <View >
                    <Text style={{textDecorationLine:'underline'}}>Detail..</Text>
                    </View> 
                    </View> */}
                    
                  </ListItem>
               
                
                  
              )
            }}
            
          />

        </View>
</ScrollView > 
        <Dialog 
          visible={this.state.invisible}  
          title="Do you Want to Keep Data?"
          titleStyle={{textAlign:'center'}}
          // onTouchOutside={() => this.setState({dialogVisible: false})} 

        >
          <View>
            <Button title='Yes' onPress={()=>this.deletecar()}/>
          </View>
          <View>
           <Button title='No' onPress={()=>{this.setState({invisible:false})
                                           
          }}/>
         </View>
        </Dialog>

           
        {/* <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='green' title="Select Car" onPress={Actions.selectmycar}>
            <Icon name="md-search" style={styles.actionButtonIcon} />
          </ActionButton.Item>
              {this.props.CarSelect.Make === undefined &&
                this.props.CarSelect.Model === undefined
                ? 'SelectCar'
                : this.props.CarSelect.Make + ' ' + this.props.CarSelect.Model}
          <ActionButton.Item buttonColor='#9b59b6' title="Edit Car" onPress={Actions.editcar}>
            <Icon name="md-clipboard" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          </ActionButton> */}
        
      </View>

      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  rowText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  scrollview:{
    flexGrow:1,
  },
  rowStyle: {
    backgroundColor: '#333333',
    flex: 1,
    height: 100,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainviewStyle: {
    flex: 1,
    backgroundColor:'#00b386',
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: 'green',
    flexDirection: 'row',
    height: 80,
    alignItems: 'center'
  },
  bottomButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18
  }
})
