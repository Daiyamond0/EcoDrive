import React, { Component } from 'react';
import { View, Button ,Text,TouchableHighlight,StyleSheet} from 'react-native';
import { ListItem,List } from 'native-base'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';



export class SelectMyCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
          <TouchableHighlight style={styles.bottomButtons} onPress={Actions.mycar}>
              <Text style={styles.footerText}>SelectCar</Text>
          </TouchableHighlight>
          </View> */}
          
<RadioForm
 radio_props={this.props.mycar}
  formHorizontal={true}
  animation={true}
>
{radio_props.map((item, index) => {
  <RadioButton labelHorizontal={true} key={index} >
    <RadioButtonInput
      obj={item.Model}
      index={index}
      // isSelected={this.state.value3Index === index}
      // onPress={onPress}
      borderWidth={1}
      buttonInnerColor={'#e74c3c'}
      // buttonOuterColor={this.state.value3Index === index ? '#2196f3' : '#000'}
      buttonSize={40}
      buttonOuterSize={80}
      buttonStyle={{}}
      buttonWrapStyle={{marginLeft: 10}}
    />
    <RadioButtonLabel
      obj={item.Model}
      index={index}
      labelHorizontal={true}
      // onPress={onPress}
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