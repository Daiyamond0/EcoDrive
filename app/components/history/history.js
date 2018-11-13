import React from 'react'

let date = new Date();

import {
  View,
  Image,
  Switch,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native'
import { Container, Header, Content, Tab, Tabs ,Picker,List,ListItem ,Card, CardItem,} from 'native-base';
import { Actions } from 'react-native-router-flux'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Modal from "react-native-modal";
import { AreaChart, Grid ,XAxis ,YAxis} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
import {ButtonGroup} from 'react-native-elements'
const screenWidth = Dimensions.get('window').width
import firebaseService from '../../enviroments/firebase'


export class History extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'Allcar',
      historytrip:[],
      historydate:[],
      historycar:[],
      dayofweek:[],
      Today:{
        CO2:[0],
        Fuelrate:[],
        Fueluse:[],
        Distane:[]
      },
      Week:{
        CO2:[],
        Fuelrate:[],
        Fueluse:[],
        Distane:[]
      },
      isModalVisible: false,
      dateselect: ' ',
      selectedIndex: 0
      
    }
  }
  componentWillMount(){
    const uid = this.props.user.uid
    var historytrip = []
    var historydate = []
    var historycar = []
    var TodayCO2 = [0]
    var WeekCO2 = []

    var week =[]
    var curr = new Date
    var first = curr.getDate() - curr.getDay();
    var firstday = (new Date(curr.setDate(first+1))).toString();
    for (var i = 1; i < 7; i++) {
      var next = new Date(curr.getTime());
      next.setDate(first + i);
      week.push(next.toISOString().split("T")[0])
  }
  this.setState({dayofweek:week})

    firebaseService.database().ref(`History/${uid}`).once(
      'value',
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var his = childSnapshot.val()
            // console.log(his.Car)
            historytrip.push(his)
            this.setState({historytrip:historytrip})
            historydate.push(his.Date)
            this.setState({historydate:historydate})
            if(!historycar.includes(his.Car.Make +' '+ his.Car.Model) ){
              historycar.push(his.Car.Make +' '+ his.Car.Model)
              this.setState({historycar:historycar})
            }
            if( his.Date == date.toISOString().split("T")[0] ){
              TodayCO2.push(his.CO2)
              this.setState({Today:{CO2:TodayCO2}})
            }
            if( week.includes(his.Date) == true ){
              WeekCO2.push(his.CO2)
              this.setState({Week:{CO2:WeekCO2}})
            }
            
        }.bind(this))
        
      }.bind(this),
      function (error) {
        console.log(error)
      }
      
    )
    
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    if(dd<10) {
      dd='0'+dd;
    } 
    if(mm<10) {
    mm='0'+mm;
    }
    this.setState({dateselect:yyyy + '-' + mm + '-'+ dd})
    
    
  
  }

  
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
   
  Historyday(item,index){
    this.props.HistoryTripsDay(item,index)
    Actions.push('historytripday')
  }

  toggleModal () {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }
  selectDay(day){
    this.setState({dateselect:day.dateString})
    this.toggleModal()
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    
  }
  parsedate(date){
    
    var d = new Date(date)
    return (
      <Text>{d.toDateString()}</Text>
    )
  }
  colornoti(item){
    console.log(item)
    if(item.Fuelrate > item.Car.FuelConsumption - (item.Car.FuelConsumption * 0.2)){
      return{
        borderLeftWidth: 15 ,
        borderLeftColor: 'green',
      }
    }
    if(item.Fuelrate < item.Car.FuelConsumption - (item.Car.FuelConsumption * 0.2) && item.Fuelrate >= item.Car.FuelConsumption - (item.Car.FuelConsumption * 0.25)){
      return{
        borderLeftWidth: 15 ,
        borderLeftColor: 'orange',
      }
    }
    if(item.Fuelrate < item.Car.FuelConsumption - (item.Car.FuelConsumption * 0.25)){
      return{
        borderLeftWidth: 15 ,
        borderLeftColor: 'red',
      }
    }
  }
  render() {
    // console.log(Object(this.state.historytrip[0]).Date)
    // console.log(this.state.historytrip)
    // console.log(this.state.historydate)
    // console.log(this.state.historycar)
// console.log(this.state.dayofweek)
// console.log(this.state.Week.CO2)


  
    return (
      <Container>
    
      <Tabs>
        <Tab heading="Trips History">
         <ScrollView>
        <View style={{flex: 1, flexDirection: 'row'}}>
   
        <Picker style={{}}
          mode='dropdown'
          placeholderStyle={{ color: '#2874F0' }}
          note={false}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
        >
          
          <Picker.Item label='All Car' value={'Allcar'} />
          {this.state.historycar.map((item, index) => {
            return (
              <Picker.Item
                label={item}
                value={item}
                
              />
            ) 
          })}
        </Picker>
      <View style={{marginTop:5}}>
         <TouchableOpacity onPress={this.toggleModal.bind(this)}>
       <Image style={{width: 40, height: 40}} source={require('./calendar1.png')}/>
         </TouchableOpacity>
         </View>
   <Modal isVisible={this.state.isModalVisible} onBackButtonPress={this.toggleModal.bind(this)} onBackdropPress={this.toggleModal.bind(this)}>
            <View style={styles.modalContent}>
              
              <Calendar 
                current={this.state.dateselect}
                minDate={Object(this.state.historytrip[0]).Date}
                maxDate={new Date()}
                hideExtraDays={true}
                markedDates={{[this.state.dateselect]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
                onDayPress={(day) => {this.selectDay(day)}}
              />

            
            
              

            </View>
          </Modal>
        </View>
      <View style={{justifyContent:'center',marginTop:20}}>
        <Text style={{color:'black',fontSize:20,marginLeft:100,fontWeight:'bold',justifyContent:'center'}}>{this.parsedate(this.state.dateselect)}</Text>
        </View>
        {this.state.historytrip.map((item, index) => {
          if(Object(item).Date == this.state.dateselect){
            if(this.state.selected.includes(Object(item).Car.Make + ' '+ Object(item).Car.Model)== true ||this.state.selected == 'Allcar' ){
            return (
           
              <View >
                
                <Card > 
                  {/* <CardItem header>
                  <Text>Date: { this.parsedate(Object(item).Date) }</Text>
                  
                  </CardItem> */}<TouchableHighlight onPress={()=>this.Historyday(item,index)}>
                  <CardItem style={this.colornoti(item)}>
                  <View style={{width:340,marginTop:1,height:450}}>
                  <Text style={{color:'black',fontSize:18,marginLeft:5,marginTop:5}}>{Object(item).Time} - {Object(item).Timeend}</Text>
                  <View>
          <View style={{flex:1,flexDirection:'row'}}>
                <Image
                style={{width: 25, height: 25,marginLeft: 25,marginTop:20}}
                source={require('./place.png')}
              />
              <View style={{height:30,width:240,marginLeft:10,marginTop:20,backgroundColor:'white',borderColor:'#cccccc',borderRadius:5,borderWidth:0.5}}>
              <Text style={{fontSize:15,color:'#6a83fb',marginLeft:10,marginTop:5,alignItems:'center',alignContent:'center'}}>{Object(item).Source}</Text>
              </View>
              </View>
              <View style={{flex:1,flexDirection:'row',marginTop:50}}>
              <Image
                style={{width: 25, height: 25,marginLeft: 25,marginTop:12}}
                source={require('./gps.png')}
              />
              <View style={{height:30,width:240,marginLeft:10,marginTop:10,backgroundColor:'white',borderColor:'#cccccc',borderRadius:5,borderWidth:0.5}}>
              <Text style={{fontSize:15,color:'#6a83fb',alignItems:'center',marginLeft:10,marginTop:5,alignContent:'center'}}>{Object(item).Destination}</Text>
              </View>
              </View>
              <View style={{flex:1,marginTop:65}}>
                                <View style={{width:290,height:60,backgroundColor:'white',justifyContent:'center',alignSelf:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb',marginRight:18,}}>
                                    <View style={{flex:1,flexDirection:'row',marginLeft:30,marginTop:10}}>
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:2}}>Brand</Text>
                                            <Text style={{fontSize:11,color:'#f000ba',marginTop:5}}>{Object(item).Car.Make}</Text>
                                        </View>
                                        <Image
                                            style={{width: 25, height: 25,marginLeft: 65,marginTop:12}}
                                            source={require('./cars.png')}
                                        />
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontSize:10,color:'#6a83fb',marginLeft:70}}>Model</Text>
                                            <Text style={{fontSize:11,color:'#f000ba',marginTop:5,marginLeft:50}}>{Object(item).Car.Model}</Text>
                                        </View>
                                    </View>
                                </View>        
                </View>
              <View style={{flex:1,marginTop:65}}>
              <View style={{flexDirection:'row'}}>
              <View style={{width:142.5,marginLeft:15,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
              <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:10}}>
              <View style={{flexDirection:'column',marginLeft:15}}>        
              <Image
                style={{width: 25, height: 25,marginTop:1,marginLeft:5}}
                source={require('./road.png')}
              />
              <Text style={{fontSize:10,color:'#6a83fb'}}>Distance</Text>
              </View>
              <View style={{flexDirection:'column',marginLeft:35}}>
              <Text style={{fontSize:15,color:'#f000ba'}}>{Object(item).Distance}</Text>
              <Text style={{fontSize:10,color:'#f000ba',marginTop:3}}>km</Text>
              </View>
              </View>        
              </View>
              <View style={{width:142.5,marginLeft:5,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
              <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:10}}>
              <View style={{flexDirection:'column',marginLeft:5}}>        
              <Image
                style={{width: 25, height: 25,marginTop:1,marginLeft:5}}
                source={require('./time.png')}
              />
              <Text style={{fontSize:10,color:'#6a83fb'}}>Duration</Text>
              </View>
              <View style={{flexDirection:'column',marginLeft:20}}>
              <Text style={{fontSize:15,color:'#f000ba'}}>{Object(item).Duration}</Text>
              <Text style={{fontSize:10,color:'#f000ba',marginTop:3,marginLeft:13}}>mins</Text>
              </View>
              </View>
              </View>
              </View>        
              </View>
              <View style={{flex:1,marginTop:65}}>
              <View style={{flexDirection:'row'}}>
              <View style={{width:142.5,marginLeft:15,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
              <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:5}}>
              <View style={{flexDirection:'column',marginLeft:2}}>        
              <Image
                style={{width: 25, height: 25,marginTop:1,marginLeft:18}}
                source={require('./gas.png')}
              />
              <Text style={{fontSize:8,color:'#6a83fb'}}>Fuel Consumption</Text>
              <Text style={{fontSize:8,color:'#6a83fb',marginLeft:20}}>Rate</Text>
              </View>
              <View style={{flexDirection:'column',marginLeft:20}}>
              <Text style={{fontSize:15,color:'#f000ba'}}>{Object(item).Fuelrate}</Text>
              <Text style={{fontSize:10,color:'#f000ba',marginTop:3}}>km/L</Text>
              </View>
              </View>        
              </View>
              <View style={{width:142.5,marginLeft:5,height:60,backgroundColor:'white',justifyContent:'center',borderRadius:5,borderWidth:2,borderColor:'#6a83fb'}}>
              <View style={{flex:1,flexDirection:'row',marginLeft:10,marginTop:10}}>
              <View style={{flexDirection:'column',marginLeft:5}}>        
              <Image
                style={{width: 25, height: 25,marginTop:1,marginLeft:5}}
                source={require('./co2.png')}
              />
              <Text style={{fontSize:10,color:'#6a83fb',marginLeft:8}}>CO2</Text>
              </View>
              <View style={{flexDirection:'column',marginLeft:25}}>
              <Text style={{fontSize:15,color:'#f000ba'}}>{Object(item).CO2}</Text>
              <Text style={{fontSize:10,color:'#f000ba',marginTop:3,marginLeft:13}}>kg</Text>
              </View>
              </View>
              </View>
              </View>        
              </View>
              
            <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',marginTop:75,height:40,width:250,borderRadius:5,backgroundColor:'#6a83fb',marginRight:15}}>
              <Text style={{color:'white'}}>See more details ></Text>
              
            </View>
            </View>
                  
                  {/* <Text>Time: {Object(item).Time} - {Object(item).Timeend}</Text>
                  <Text>Source: {Object(item).Source}</Text> 
                  <Text>Source: {Object(item).Destination}</Text> 
                  <Text>Fueluse: {Object(item).Fueluse} L  </Text>
                  <Text>CO2: {Object(item).CO2} KG  </Text>
                  <Text>Distance: {Object(item).Distance} KM  </Text>
                  </View>
                  <View>
                  <Text>Car: {Object(item).Car.Make + '' + Object(item).Car.Model}    </Text> */}
                  </View>
                </CardItem> 
                </TouchableHighlight>
                </Card>
               
              </View>
            ) 
          }
          
          }
          
          })}
          {this.state.historydate.includes(this.state.dateselect) == false  ? 
            <View style={{flex:1, alignItems: 'center',
            justifyContent: 'center',paddingTop:150}}>
                <Text>Not Drive This Day</Text>
              </View>
          :null}
     </ScrollView>
     
        </Tab>
       
      
      </Tabs>
    </Container>
        )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
})