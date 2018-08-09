import React, { Component } from 'react';
import { View, Button ,Text,TouchableHighlight,StyleSheet} from 'react-native';
import { ListItem,List } from 'native-base'
import RadioGroup from 'react-native-radio-buttons-group';
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
  onPress = data => this.setState({ data });


  render() {
    let selectedButton =Object.values(this.props.mycar).find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : Object.values(this.props.mycar).Model;
    return (
      <View style={styles.mainviewStyle}>
        {/* <Text>{JSON.stringify(this.props.mycar)}</Text> */}
        <View>
            <List dataArray={Object.values(this.props.mycar)} 
            renderRow={(item) =>{
              return(
                <TouchableHighlight >
              <ListItem >
                <Text>Make: {item.Make}</Text>
                <Text>Model: {item.Model}</Text>
                <Text>Speed:{item.Speed} </Text>
              </ListItem>
              </TouchableHighlight>
              )
            }
            } >
          </List>
            </View>
            <View>
            <Text style={styles.valueText}>
                    Value = {selectedButton}
                </Text>
                <RadioGroup radioButtons={Object.values(this.props.mycar).Model} onPress={this.onPress} />
            </View>

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
 
});