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
    this.props.carlist
  }

  render() {
   let lists = this.props.cardata;
   listsComponents = [];

   for (var i = 0; i < lists.length; i++) {
    listsComponents[i] = (
      <View>
        <Text>{lists[i].key}</Text>
        <FlatList
          key={lists[i].key}
          data={lists[i].data}
          numColumns={2}
          renderItem={({item}) => <Text>{item}</Text>}
        />
      </View>
    )
  }
    return (
      <View style={{}}>
        
        {/* <Text>5555</Text> */}
        {/* <List dataArray={this.props.cardata} 
            renderRow={(item) =>{
              return(
              <ListItem>
                <Text>{JSON.stringify(item)}</Text>
              </ListItem>
              )
            }
            }>
          </List> */}
          {listsComponents}
          
      {/* <Text>55555</Text> */}
      {/* <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
             {this.props.cardata.map((item, index) => {
        return (<Picker.Item label={item.key} value={item} key={index}/>) 
    })}
            </Picker> */}
  
            
      </View>
    );
  }
}