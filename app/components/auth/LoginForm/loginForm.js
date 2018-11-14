import React, { Component } from 'react';
import { View, Alert, Image, Button ,YellowBox } from 'react-native';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';

export class LoginFormComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.restore();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.error && this.props.error) {
      Alert.alert('error', this.props.error);
    }
    if(this.props.logged) {
      Actions.reset('home');
    }
  }

  render() {
    const { login, loading } = this.props;
    return (
      
        <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.imageBox}>
          <Image style={styles.image} source={require('./ecodrive.png')}/>
        </View>
        <View style={styles.loginBox}>
          {loading ? <LoadingIndicator color="#009900"
                                       size="large"/> :
            <BasicFormComponent buttonTitle={'login'}
                                onButtonPress={login} /> }
        </View>
        <View>
        {loading ? null :
          <Button onPress={Actions.signup}
                  title="Signup"
                 
                  ></Button> }
        </View>
        </KeyboardAwareScrollView>
    );
  }
  
}
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);