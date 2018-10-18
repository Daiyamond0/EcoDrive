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
      dateselect: date.toISOString().split("T")[0],
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
            historytrip.push(his)
            this.setState({historytrip:historytrip})
            historydate.push(his.Date)
            this.setState({historydate:historydate})
            if(!historycar.includes(his.Make +' '+ his.Model) ){
              historycar.push(his.Make +' '+ his.Model)
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
    
    // var dd = date.getDate();
    // var mm = date.getMonth()+1; 
    // var yyyy = date.getFullYear();
    // if(dd<10) {
    //   dd='0'+dd;
    // } 
    // if(mm<10) {
    // mm='0'+mm;
    // }
    // this.setState({dateselect:yyyy + '-' + mm + '-'+ dd})
    
    
  
  }

  
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
   
  // Historyday(item,index){
  //   this.props.HistoryTripsDay(item,index)
  //   Actions.push('historytripday')
  // }

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
  render() {
    // console.log(Object(this.state.historytrip[0]).Date)
    // console.log(this.state.historytrip)
    // console.log(this.state.historydate)
    // console.log(this.state.historycar)
console.log(this.state.dayofweek)
console.log(this.state.Week.CO2)
const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

  
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
      <View>
         <TouchableOpacity onPress={this.toggleModal.bind(this)}>
       <Image style={{width: 50, height: 50}} source={require('./calendar.png')}/>
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
      <View>
        <Text style={{textAlign:'center'}}>{this.state.dateselect}</Text>
        </View>
        {this.state.historytrip.map((item, index) => {
          if(Object(item).Date == this.state.dateselect){
            if(this.state.selected.includes(Object(item).Make + ' '+ Object(item).Model)== true ||this.state.selected == 'Allcar' ){
            return (
           
              <View>
                <Card>
                  <CardItem header>
                  <Text>Date: {Object(item).Date}</Text>
                  </CardItem>
                  <CardItem>
                    <View>
                  <Text>Fueluse: {Object(item).Fueluse} L  </Text>
                  <Text>CO2: {Object(item).CO2} KG  </Text>
                  <Text>Distance: {Object(item).Distance} KM  </Text>
                  </View>
                  <View>
                  <Text>Car: {Object(item).Make + '' + Object(item).Model}    </Text>
                  </View>
                </CardItem>
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
        <Tab heading="Statistics">
        <View>
        <ButtonGroup
      onPress={this.updateIndex.bind(this)}
      selectedIndex={this.state.selectedIndex}
      buttons={['Today', 'Week', 'Month','Year']}
      containerStyle={{height: 30}}
    />
    </View>
      
      
   {this.state.selectedIndex == 0 && this.state.Today.CO2.length != 0?
   <View>
   <Text>
     CO2
   </Text>
   <View>
  <LineChart
    data={{
      labels: [],
      datasets: [{
        data: this.state.Today.CO2
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 5
      }
    }}
    bezier={true}
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> 
  </View>
  </View>
  :  null
  // <View style={{flex:1, alignItems: 'center',
  // justifyContent: 'center',paddingTop:150}}>
  //     <Text>Not Drive This Day</Text>
  //   </View>
  }
   {/*------------------------- week------------------------------ */}
    {this.state.selectedIndex == 1 && this.state.Week.CO2.length != 0 ? 
   <View>
   <Text>
     CO2
   </Text>
   <View>
  <LineChart
    data={{
      labels: [],
      datasets: [{
        data: this.state.Week.CO2
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 5
      }
    }}
    bezier={true}
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> 
  </View>
  </View>
  : null
  //  <View style={{flex:1, alignItems: 'center',
  // justifyContent: 'center',paddingTop:150}}>
  //     <Text>Not Drive This Week</Text>
    // </View>
    }
            
            
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