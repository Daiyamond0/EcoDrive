import React, { Component } from 'react'
import {
  View,
  Button,
  Image,
  Text,
  Switch,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Container,
  Header,
  Left,
  ImageBackground
} from 'react-native'
import{
  StackNavigator
} from 'react-navigation';
import DrawerStack from '../Menu/stacks/drawerStack.js'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'
import { Actions } from 'react-native-router-flux'
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator'
import { Footer, FooterTab } from 'native-base'
import ActionButton from 'react-native-action-button';
import Toast from '@remobile/react-native-toast'
import firebaseService from '../../enviroments/firebase'
import {DrawerNavigator} from 'react-navigation';
import Drawer from '../Menu/Drawer.js'
import HomeScreen from "../../components/HomeScreen/index.js";


export class Home extends React.Component {

  render () {
    
    return (
      <HomeScreen/>
    )
    }
    }