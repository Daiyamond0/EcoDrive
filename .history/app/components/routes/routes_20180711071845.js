import React, {Component} from 'react';
import { styles } from './styles';
import { Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';

import HomeContainer from '../../containers/home/homeContainer';
import SessionContainer from '../../containers/session/sessionContainer';
import SignupContainer from '../../containers/session/signupContainer';
import startmapContainer from '../../containers/startmap/startmapContainer';
import selectcatContainer from '../../containers/selectcar/selectcarContainer';
import historyContainer from '../../containers/history/historyContainer';
import BluetoothContainer from '../../containers/Bluetooth/BluetoothContainer';
import MycarContainer from '../../containers/selectcar/MycarContainer/';
import CreatecarContainer from '../../containers/selectcar/CreatecarContainer';

import { RouterRedux } from '../../containers/routes/routesContainer';
import { configureStore } from '../../store/store';

const store = configureStore();

export class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterRedux navigationBarStyle={styles.navBar} tintColor='#ffffff' titleStyle={styles.barButtonTextStyle}>
          <Scene key="root">
            <Scene key="login" component={SessionContainer} title="Login" initial={true}/>
            <Scene key="signup" component={SignupContainer} title="Signup"/>
            <Scene key="home" component={HomeContainer} title="Home"/>
            <Scene key="startmap" component={startmapContainer} title="Startmap"/>
            <Scene key="selectcar" component={selectcatContainer} title="SelectCar"/>
            <Scene key="history" component={historyContainer} title="History"/>
            <Scene key="bluetooth" component={BluetoothContainer} title="Bluetooth"/>
            <Scene key="createcar" component={CreatecarContainer} title="CreateCar"/>
            <Scene key="mycar" component={MycarContainer} title="MyCar"/>
          </Scene>
        </RouterRedux>
      </ Provider>
    );
  }
}
 