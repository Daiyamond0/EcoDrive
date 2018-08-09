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
      seriecar:[],
      details:[]
    };
  }
  onValueChange(value) {
    this.setState({
      series: value
    });
  }
  componentWillMount(){
    this.props.carlist()
    
    
  }
  componentDidUpdate(){
  
  }
  componentWillReceiveProps(nextProps){
    const make = this.props.select
    const model = nextProps.modelselect
    console.log(make)
    console.log(model)
    if(model != null && make != null   ){
    firebaseService.database().ref(`CarList/${make}/${model}`).on('value',function(snapshot){
      const seriecars = snapshot.val();
      this.setState({ seriecar: seriecars })
}.bind(this), function(error) { console.log(error); });
    }
  }
  
  CarDetail () {
    const make = this.props.select
    const model = this.props.modelselect
    const series = this.state.series
    if(model != null && make != null &&series!= null  ){
    firebaseService.database().ref(`CarList/${make}/${model}/${series}`).on('value',function(snapshot){
      const detail = snapshot.val();
      this.setState({ details: [...this.state.details,detail] })
    }.bind(this), function(error) { console.log(error); });
  }
  }
  

  render() {
    console.log(typeof this.state.seriecar);
    // const make = this.props.select
    // const model = this.props.modelselect
    // this.props.Cardetail()
    // const make = this.props.select
    // this.props.MakeCar(make)
   
    return (
      
      <View style={{}}>
       
        {/* <Text>5555</Text> */}
        {/* <List dataArray={this.state.seriecar} 
            renderRow={(item) =>{
              return(
              <ListItem>
                <Text>{Object.entries(item)[0]}</Text>
                <Text>{Object.values(item)[1]}</Text>
              </ListItem>
              )
            }
            }>
          </List> */}
          <List dataArray={this.state.details} 
            
            renderRow={(item,index) =>{
              return(
              <ListItem>
                <Text>555{item.Model}</Text>
                
              </ListItem>
              )
            }
            }>
            key={item}
          </List>

          {/* <List>
          {
            Object.keys(this.state.details).map((item, i) => (
            <ListItem
            key={i}
            Model={item}
            Speed={item}
            />
             ))
          }
          </List> */}
          <Text>{JSON.stringify(this.state.details)}</Text>
      <Text>{JSON.stringify(this.state.seriecar)}</Text>
      <Text>{this.state.series}</Text>
      {/* <Text>{this.props.select}</Text>
      <Text>{this.props.modelselect}</Text> */}
            <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.props.select}
              onValueChange={this.props.onValueChange.bind(this)}
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
              {this.state.seriecar.map((item, index) => {
              return (< Picker.Item label={Object.values(item)[0]} value={index} key={index} />);
              })} 
            </Picker>
            <TouchableHighlight>
              <Button title="Go" onPress={()=>this.CarDetail()}/>
            </TouchableHighlight>
            {/* <List dataArray={this.state.details} 
            renderRow={(item) =>{
              return(
              <ListItem>
                <Text>{item.Model}</Text>
                <Text>{item}</Text>
              </ListItem>
              )
            }
            }>
          </List> */}
            
      </View>
      
    );
  }
}