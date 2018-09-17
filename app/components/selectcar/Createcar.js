import React, { Component } from 'react'
import { View, Button, Text, FlatList, TouchableHighlight } from 'react-native'
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { ListItem, List, Picker } from 'native-base'
import firebaseService from '../../enviroments/firebase'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';

export class CreateCar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      series: undefined,
      seriecar: [],
      details: [],

      cardata: [],
      checkcar: [],
      cardetail: []
    }
  }
  onValueChange (value) {
    this.setState({
      series: value
    })
  }
  componentWillMount () {
    this.props.carlist() /// 1.ดึงข้อมูลรถทุกคันมา
  }
  componentDidUpdate () {}
  componentDidMount () {}
  componentWillReceiveProps (nextProps) {
    /// /// แสดง series หลังเลือก make กับ model
    const make = this.props.make
    const model = nextProps.modelselect
    if (model != null && make != null) {
      firebaseService
        .database()
        .ref(`CarList/${make}/${model}`)
        .on(
          'value',
          function (snapshot) {
            const seriecars = snapshot.val()
            this.setState({ seriecar: seriecars })
          }.bind(this),
          function (error) {
            console.log(error)
          }
        )
    }else{
      this.setState({
        series: undefined
      })
      this.setState({
        seriecar:[]
      })
    }
    /// //// เมื่อเข้ามาหน้านี้จะดึงรถที่ add ไปแล้วของ user ที่ login อยู่
    const uid = this.props.user.uid
    firebaseService.database().ref(`user/${uid}`).once('value', function (
      snapshot
    ) {
      snapshot.forEach(
        function (childSnapshot) {
          childSnapshot.forEach(
            function (childchildSnapshot) {
              const childData = Object.values(childchildSnapshot.val())[5] /// ถ้าเพิ่ม document ต้องแก้ให้เลือกที่ model car
              this.setState({ checkcar: [...this.state.checkcar, childData] })
              // console.log(JSON.stringify(this.state.checkcar));
            }.bind(this)
          )
        }.bind(this)
      )
    }.bind(this), function (error) {
      console.log(error)
    }) //
  }

  /// ///// แสดงรายละเอียดข้อมูลรถที่เลือก
  CarDetail () {
    const make = this.props.make
    const model = this.props.modelselect
    const series = this.state.series
    if (model != null && make != null && series != null) {
      firebaseService
        .database()
        .ref(`CarList/${make}/${model}/${series}`)
        .once(
          'value',
          function (snapshot) {
            const detail = snapshot.val()
            this.setState({ details: [detail] })
            this.setState({ cardetail: detail })
          }.bind(this),
          function (error) {
            console.log(error)
          }
        )
    }
    if(model == undefined && make == undefined && series == null){
      alert('กรุณาเลือก Make และ Model และ Serie')
     this.setState({details: []})
     this.setState({ cardetail: []})
     
  }
  if(make != undefined && model == undefined && series == undefined){
      
   alert('กรุณาเลือก Model และ Serie')
   this.setState({details: []})
   this.setState({ cardetail: []})
 }
 if(make != undefined && model != undefined && series == undefined){
      
  alert('กรุณาเลือก Serie')
  this.setState({details: []})
  this.setState({ cardetail: []})
}
  }

  /// /////เพิ่มรถที่ต้องการ
  AddData () {
    const uid = this.props.user.uid
    const car = Object.values(this.state.details)[0]
    const model = this.state.cardetail.Model
    const checky = this.state.checkcar
    const cardetail = this.state.cardetail;
    console.log(checky)
    if (checky.includes(model) === false && cardetail.length != 0) {
      /// ///เช็คว่าเคยเพิ่มรถคันนี้ไปยัง
      firebaseService
        .database()
        .ref(`user/${uid}`)
        .push({
          car
        })
        .catch(error => {
          console.log(error)
        })
      Actions.reset('selectcar')
    } if(checky.includes(model) === true ) {
      alert('เคยเพิ่มไปแล้ว')
    }
    if(cardetail.length == 0){
        alert('กรุณาเพิ่มรถที่ต้องการ')
    }
    /// แสดงรถทุกคันที่เพิ่มไปแล้วจาก firebase
    firebaseService.database().ref(`user/${uid}`).once('value', function (
      snapshot
    ) {
      const cardat = snapshot.val()
      this.setState({ cardata: [cardat] })
    }.bind(this), function (error) {
      console.log(error)
    })
  
    
  }

  render () {
    console.log(this.state.cardetail)
    return (
      <View style={{}}>
        <View style={{backgroundColor:'white',borderColor:'black',borderWidth:1,width:400,height:50}}>      
        <Text style={{fontSize:15,color:'#000066',marginTop:'3%',marginLeft:'1%'}}>Make Car</Text>
      </View>
      <Picker style={{}}
          mode='dropdown'
          placeholder='Select One'
          placeholderStyle={{ color: '#2874F0' }}
          note={false}
          selectedValue={this.props.make}
          onValueChange={ this.props.MakeChange.bind(this) }

        >
          
          <Picker.Item label='Select' value={null} />
          {Object.keys(this.props.cardata).map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />
          })}

        </Picker>
        <View style={{backgroundColor:'white',borderColor:'black',borderWidth:1,width:400,height:50}}>
        <Text style={{fontSize:15,color:'#000066',marginTop:'3%',marginLeft:'1%'}}>Model Car</Text>
      </View>
         <Picker style={{}}
          mode='dropdown'
          placeholder='Select One'
          placeholderStyle={{ color: '#2874F0' }}
          note={false}
          selectedValue={this.props.modelselect} // change to props
          onValueChange={this.props.Modelchange.bind(this)} // change to props
        >
          <Picker.Item label='Select' value={null} />
          {Object.keys(this.props.model).map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />
          })}
        </Picker>
        <View style={{backgroundColor:'white',borderColor:'black',borderWidth:1,width:400,height:50}}>
      <Text style={{fontSize:15,color:'#000066',marginTop:'3%',marginLeft:'1%'}}>Serie Car</Text>
    </View>
    <Picker style={{}}        
          mode='dropdown'
          placeholder='Select One'
          placeholderStyle={{ color: '#2874F0' }}
          note={false}
          selectedValue={this.state.series}
          onValueChange={this.onValueChange.bind(this)}
        >
        <Picker.Item label='Select' value={null} />
          {this.state.seriecar.map((item, index) => {
            return (
              <Picker.Item
                label={Object.values(item)[5]}
                value={index}
                key={index}
              />
            ) /// ถ้าเพิ่ม document ต้องแก้ให้เลือกที่ model car
          })}
        </Picker>
        <TouchableHighlight>
        <View style={{alignItems:"center"}}>
          <Icon name='md-checkmark-circle' onPress={() => this.CarDetail()} style={styles.actionButtonIcon} />
          <Text style={{fontSize:12,color:'blue'}}>Check!</Text>
        </View>
        </TouchableHighlight>
        <View>
          <List
            dataArray={this.state.details}
            renderRow={item => {
              return (
                <View style={{}}>
                <View style={{alignItems:"center"}}>
                  <Text>Model: {item.Model}</Text>
                  <Text>Speed: {item.Speed}</Text>
                  <Text>FuelType: {item.FuelType.FuelType}</Text>
                </View>
                </View>
              )
            }}
          />
        </View>
        <View style={styles.submitText}>
          <Button title='Create' onPress={() => this.AddData()} />
        </View>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 70,
    height: 70,
    color: 'black',
    marginTop: '20%',
  },
  submitText:{
    borderRadius:30,
    marginRight:50,
    marginLeft:50,
    marginTop:'15%',
},
});
