import React, { Component } from 'react';
import { View, Button ,Text,FlatList} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { ListItem,List ,Picker} from 'native-base';

export class CreateCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  componentWillMount(){
    this.props.carlist()
  }

  componentDidMount(){
    // this.props.Modellist()
  }
  render() {
    console.log(typeof this.props.select);
    return (
      <View style={{}}>
       



        {/* <Text>5555</Text> */}
        {/* <List dataArray={this.props.cardata} 
            renderRow={(item) =>{
              return(
              <ListItem>
                <Text>{Object.keys(item)[0]}</Text>
              </ListItem>
              )
            }
            }>
          </List> */}
         
          
      <Text>{JSON.stringify(this.props.select)}</Text>
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

            <List dataArray={Object.keys(this.props.model)} 
            renderRow={(item) =>{
              return(
              <ListItem>
                <Text>{item}</Text>
              </ListItem>
              )
            }
            }>
          </List>
  
            
      </View>
    );
  }
}