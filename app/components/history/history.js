import React from 'react'
import { AppRegistry, Alert } from "react-native";
import {
  View,
  Image,
  Switch,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native'
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import{
  StackNavigator
} from 'react-navigation';
import { styles } from '../home/styles.js'
import { Actions } from 'react-native-router-flux'
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator'
import { Footer, FooterTab } from 'native-base'
import ActionButton from 'react-native-action-button';
import Toast from '@remobile/react-native-toast'
import firebaseService from '../../enviroments/firebase'
import {DrawerNavigator} from 'react-navigation';

export class History extends React.Component {
  render() {
    return (
      History.navigationOptions = ({ navigation }) => ({
        header: (
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>History</Title>
            </Body>
            <Right />
          </Header>
        )
      }));
       
  }
}