import React, { Component } from 'react';
import { View, Alert, Image } from 'react-native';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import MapViewDirections from '../../../../node_modules/react-native-maps-directions';

export class SignupFormComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if(this.props.registered) {
      Actions.reset('home');
    }
  }

  render() {
    const { signup, loading } = this.props;
    return (
      <View style={styles.scrollView}>
        <View style={styles.imageBox}>
          <Image style={styles.image} source={require('../LoginForm/ecodrive.png')}/>
        </View>
        <View style={styles.loginBox}>
            {loading ? <LoadingIndicator color="#009900"
                                         size="large"/> :
              <BasicFormComponent buttonTitle={'signup'}
                                  onButtonPress={signup} /> }
        </View>
      </View>
    );
  }
}
