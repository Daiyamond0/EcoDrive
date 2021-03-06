import React, { Component } from 'react';
import { View, Button ,Text,FlatList,TouchableHighlight} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { ListItem,List ,Picker} from 'native-base';
import firebaseService from '../../enviroments/firebase';

export class CreateCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: undefined,
      // seriecar:[],
      details:[],
  
      cardata:[],
      checkcar:[],
      cardetail:[]
    };
  }
  onValueChange(value) {
    this.setState({
      series: value
    });
  }
  componentWillMount(){
    this.props.carlist()  /// 1.ดึงข้อมูลรถทุกคันมา
  }
  componentDidUpdate(){
  }
  componentWillReceiveProps(nextProps){
    ////// แสดง series หลังเลือก make กับ model
    const make = this.props.make
    const model = nextProps.modelselect
    this.props.SerieCar(make,model)
//     if(model != null && make != null   ){
//     firebaseService.database().ref(`CarList/${make}/${model}`).on('value',function(snapshot){
//       const seriecars = snapshot.val();
//       this.setState({ seriecar: seriecars })
// }.bind(this), function(error) { console.log(error); });
//     }
    /////// เมื่อเข้ามาหน้านี้จะดึงรถที่ add ไปแล้วของ user ที่ login อยู่
    const uid = this.props.user.uid;
    firebaseService.database().ref(`user/${uid}`).once('value',function(snapshot){ 
      snapshot.forEach(function(childSnapshot) {
        childSnapshot.forEach(function(childchildSnapshot){
            const childData = Object.values(childchildSnapshot.val())[5]; /// ถ้าเพิ่ม document ต้องแก้ให้เลือกที่ model car
            this.setState({checkcar:[...this.state.checkcar,childData]})
          console.log(JSON.stringify(this.state.checkcar));
        }.bind(this))
      }.bind(this))
    }.bind(this), function(error) { console.log(error); }); //
  }
  
  //////// แสดงรายละเอียดข้อมูลรถที่เลือก
  CarDetail () {
    const make = this.props.make
    const model = this.props.modelselect
    const series = this.state.series
    if(model != null && make != null &&series!= null  ){
    firebaseService.database().ref(`CarList/${make}/${model}/${series}`).once('value',function(snapshot){
      const detail = snapshot.val();
      this.setState({ details: [detail] })
      this.setState({ cardetail: detail})
    }.bind(this), function(error) { console.log(error); });
  }
  }

  ////////เพิ่มรถที่ต้องการ
  AddData(){
    const uid = this.props.user.uid;
    const car = Object.values(this.state.details)[0];
    const model = this.state.cardetail.Model;
    const checky = this.state.checkcar;
    console.log(checky)

  if(checky.includes(model) === false) { //////เช็คว่าเคยเพิ่มรถคันนี้ไปยัง
    firebaseService.database().ref(`user/${uid}`).push({
      car
    }) .catch((error)=>{
    console.log(error);
  });
  Actions.reset('selectcar')
      }else{
        alert('เคยเพิ่มไปแล้ว')
      }
///แสดงรถทุกคันที่เพิ่มไปแล้วจาก firebase
  firebaseService.database().ref(`user/${uid}`).once('value',function(snapshot){
    const cardat = snapshot.val();
    this.setState({ cardata: [cardat] })
  }.bind(this), function(error) { console.log(error); });
}

  render() {
    return (
      <View style={{}}>
          {/* <Text>{JSON.stringify(Object.values(this.state.cardetail)[1])}</Text> */}
          {/* <Text>{JSON.stringify(Object.values(this.state.cardata))}</Text> */}
      {/* <Text>{JSON.stringify(this.state.seriecar)}</Text>
      <Text>{this.state.series}</Text> */}
      {/* <Text>{this.props.select}</Text>
      <Text>{this.props.modelselect}</Text> */}
            <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.props.make}
              onValueChange={this.props.MakeChange.bind(this)}
            >
                {Object.keys(this.props.cardata).map((item, index) => {
                  return (< Picker.Item label={item} value={item} key={index} />);    
            })}   
            </Picker>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.props.modelselect} // change to props
              onValueChange={this.props.Modelchange.bind(this)} // change to props
            >
              {Object.keys(this.props.model).map((item, index) => {
              return (< Picker.Item label={item} value={item} key={index} />);
            })} 
            </Picker>

             <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.state.series}
              onValueChange={this.onValueChange.bind(this)}
            >
              {this.props.seriecar.map((item, index) => {
              return (< Picker.Item label={Object.values(item)[5]} value={index} key={index} />);  /// ถ้าเพิ่ม document ต้องแก้ให้เลือกที่ model car
              })} 
            </Picker>
            <TouchableHighlight>
              <Button title="Go" onPress={()=>this.CarDetail() }/>
            </TouchableHighlight>
            <View>
            <List dataArray={this.state.details} 
            renderRow={(item) =>{
              return(
              <View>
                <Text>Model: {item.Model}</Text>
                <Text>Speed: {item.Speed}</Text>
                <Text>FuelType: {item.FuelType.FuelType}</Text>
              </View>
              )
            }
            }>
          </List>
            </View>
            <View>
              <Button title="Add" onPress={()=>this.AddData()} />
            </View>
            
            
            
      </View>
      
    );
  }
}