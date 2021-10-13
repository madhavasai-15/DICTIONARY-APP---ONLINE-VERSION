import React from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/home';

export default class App extends React.Component {
  render(){
    return (
      <View style={{flex: 1}}>
        <HomeScreen/>
      </View>
    )
  }
}
