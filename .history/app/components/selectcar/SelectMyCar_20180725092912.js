import React, { Component } from 'react';
import { View, Button ,Text,TouchableHighlight,StyleSheet} from 'react-native';
import { ListItem,List } from 'native-base'
// import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';



export class SelectMyCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:0
    };
  }

  componentWillMount(){
  const uid = this.props.user.uid;
  this.props.MyCarlist(uid);
  }



  render() {
   
    return (
      <View style={styles.mainviewStyle}>
            {/* <View>
            <RadioGroup onSelect = {(index,value) => this.props.onSelect(index,value)}>
            {this.props.mycar.map((item, index ) => {
            return (< RadioButton value={item} key={index}><Text>{item.Make+" "+item.Model}</Text></RadioButton>);
            })} 
      </RadioGroup>
           <Text>{JSON.stringify(this.props.text)}</Text>
              </View>
              <View style={styles.footer}>
          <TouchableHighlight style={styles.bottomButtons} onPress={Actions.mycar} >
              <Text style={styles.footerText}>SelectCar</Text>
          </TouchableHighlight>
          </View> */}
          <RadioForm
    
  formHorizontal={false}
  animation={true}
 
>
  
  {this.props.mycar.map((obj, i) => {
    <RadioButton labelHorizontal={true} key={i} >
      {/*  You can set RadioButtonLabel before RadioButtonInput */}
      <RadioButtonInput
        obj={obj.Model}
        index={i}
        isSelected={this.state.value3Index === i}
        onPress={(value) => {this.setState({value:value})}}
        borderWidth={1}
        buttonInnerColor={'#e74c3c'}
        buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
        buttonSize={40}
        buttonOuterSize={80}
        buttonStyle={{}}
        buttonWrapStyle={{marginLeft: 10}}
      />
      <RadioButtonLabel
        obj={obj.Model}
        index={i}
        labelHorizontal={true}
        onPress={(value) => {this.setState({value:value})}}
        labelStyle={{fontSize: 20, color: '#2ecc71'}}
        labelWrapStyle={{}}
      />
      </RadioButton>
  })}
  
</RadioForm>
          


            </View>
    );
  }
}

const styles = StyleSheet.create({
 
  mainviewStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  valueText: {
    fontSize: 18, 
    marginBottom: 50,
},
footer: {
  position: 'absolute',
  flex:0.1,
  left: 0,
  right: 0,
  bottom: -10,
  backgroundColor:'green',
  flexDirection:'row',
  height:80,
  alignItems:'center',
},
bottomButtons: {
  alignItems:'center',
  justifyContent: 'center',
  flex:1,
},
footerText: {
  color:'white',
  fontWeight:'bold',
  alignItems:'center',
  fontSize:18,
},
 
});