import React from 'react';
import { StyleSheet } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation, BottomNavigationProps,  Icon, IconElement, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
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

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>USERS</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>ORDERS</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state}: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='USERS' icon={PersonIcon}/>
    <BottomNavigationTab title='ORDERS' icon={BellIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Users' component={UsersScreen}/>
    <Screen name='Orders' component={OrdersScreen}/>
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