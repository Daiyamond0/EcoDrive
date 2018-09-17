import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class BackgroundImage extends Component {

    render() {
        return (
            <Image source={require('./dd.png')}
                  style={styles.backgroundImage}>
                  {this.props.children}

            </Image>
        )
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
}
)