import React, { Component } from 'react';
import { View ,TouchableHighlight,StyleSheet,ListView ,Button,Text , TouchableOpacity} from 'react-native';
import { ListItem,List ,Picker,Footer, FooterTab,Container} from 'native-base'
import { Actions } from 'react-native-router-flux';

export class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: ''

        };
      }

    onValueChange(value) {
        this.setState({
          selected: value
        });
      }
    edit(){
        const fueltype = {
            '0':['Diesel',2600],
            '1':['E20',2300],
            '3':['E85',2360]
        }
        const x = this.state.selected
        const select = fueltype[x]
        console.log(select)
        
    }

  render() {
      const fueltype = {
          '0':['Diesel',2600],
          '1':['E20',2300],
          '3':['E85',2360]
      }
    return (
      <View style={styles.mainviewStyle}>
        <Text>Edit</Text>
        {/* <Text>{this.props.index}</Text> */}
        {/* <Text>{JSON.stringify(this.props.editdetail)}</Text> */}
        <View>
            <List>
                <ListItem><Text>{this.props.editdetail.Make}</Text></ListItem>
                <ListItem><Text>{this.props.editdetail.Model}</Text></ListItem>
                <ListItem><Text>{this.props.editdetail.Speed}</Text></ListItem>
                <ListItem>
                    <Picker
              mode="dropdown"
             
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label={this.props.editdetail.FuelType.FuelType} value={this.props.editdetail.CO2Emission} />
              <Picker.Item label="----------" value="0"/>
              {Object.values(fueltype).map((item, index) => {
              return (< Picker.Item label={item[0]} value={index} key={index} />);
            })} 
            </Picker>
            </ListItem>
            </List>
            <Text>{this.state.selected}</Text>
        </View>
            <View style={styles.footer}>
          <TouchableHighlight style={styles.bottomButtons} onPress={()=>this.edit()}>
              <Text style={styles.footerText}>OK</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.bottomButtons} onPress={{}}>
              <Text style={styles.footerText}>CANCEL</Text>
          </TouchableHighlight>
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