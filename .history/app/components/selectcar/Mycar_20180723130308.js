import React, { Component } from 'react';
import { View, Button ,Text,TouchableWithoutFeedback} from 'react-native';
import { ListItem,List } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { RadioButtons } from 'react-native-radio-buttons'

export class MyCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    
  }
  componentWillMount(){
    const uid = this.props.user.uid;
    this.props.MyCarlist(uid);
    console.log(uid);

    
  }
  componentWillReceiveProps(nextProps){
   
  }
  componentWillUpdate(){
     
  }


  render() {
    // console.log(this.props.mycar)
    const options = [
      "Option 1",
      "Option 2"
    ];
  
    function setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    }
  
    function renderOption(option, selected, onSelect, index){
      const style = selected ? { fontWeight: 'bold'} : {};
  
      return (
        <View>
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
        </View>
      );
    }
  
    function renderContainer(optionNodes){
      return <View>{optionNodes}</View>;
    }
    
    return (
      <View style={{}}>
        {/* <Text>{JSON.stringify(Object.values(this.props.mycar)[0])}</Text> */}
        {/* <View>
            <List dataArray={Object.values(this.props.mycar)} 
            renderRow={(item) =>{
              return(
              <ListItem>
                <Text>Make: {item.Make}</Text>
                <Text>Model: {item.Model}</Text>
                <Text>Speed:{item.Speed} </Text>
              </ListItem>
              )
            }
            }>
          </List>
            </View> */}
            <RadioButtons
        options={ options }
        onSelection={ setSelectedOption.bind(this) }
        selectedOption={this.state.selectedOption }
        renderOption={ renderOption }
        renderContainer={ renderContainer }
      />
      <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
      </View>
    );
  }
}