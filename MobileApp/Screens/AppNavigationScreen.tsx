import React from 'react';
import { StyleSheet } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation, BottomNavigationProps,  Icon, IconElement, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import HomeScreen from './HomeScreen';
import DietScreen from './DietScreen';
import ExcerisesScreen from './ExcerisesScreen';
const { Navigator, Screen } = createBottomTabNavigator();

type BottomTabBarProps = BottomNavigationProps & {
  navigation: any;
  state: any;
};

const PersonIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='person-outline'
  />
);

const BellIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='bell-outline'
  />
);

const EmailIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='email-outline'
  />
);


const BottomTabBar = ({ navigation, state}: BottomTabBarProps) => (
  <BottomNavigation style={{}}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='HOME' icon={PersonIcon}/>
    <BottomNavigationTab title='DIET' icon={BellIcon}/>
    <BottomNavigationTab title='EXCERISES' icon={EmailIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Users' component={HomeScreen} options={{headerShown:false}}/>
    <Screen name='Orders' component={DietScreen} options={{headerShown:false}}/>
    <Screen name='Excerises' component={ExcerisesScreen} options={{headerShown:false}}/>
  </Navigator>
);

export const AppNavigator = () => (
    <TabNavigator/>
);



const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});