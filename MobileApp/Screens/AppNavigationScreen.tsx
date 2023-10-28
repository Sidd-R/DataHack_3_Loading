import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen';
import ExcerisesScreen from './ExcerisesScreen';
import DietScreen from './DietScreen';

type AppBottomParamList = {
  HOME: undefined;
  Excercises: undefined;
  Diet: undefined;
}

const AppBottomNavigator = createBottomTabNavigator<AppBottomParamList>();

const AppNavigationScreen = () => {
  return (
    <View style={{flex:1}}>
      <AppBottomNavigator.Navigator>
        <AppBottomNavigator.Screen name="HOME" component={HomeScreen} />
        <AppBottomNavigator.Screen name='Excercises' component={ExcerisesScreen}/>
        <AppBottomNavigator.Screen name='Diet' component={DietScreen} />
      </AppBottomNavigator.Navigator>
    </View>
  )
}

export default AppNavigationScreen