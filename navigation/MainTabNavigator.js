import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import TabBarIcon from '../components/TabBarIcon';
import TabBarFoundationIcon from '../components/TabBarFoundationIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EstmtCreateScreen from '../screens/estimate/EstmtCreateScreen';
import EstmtDetailScreen from '../screens/estimate/EstmtDetailScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  EstmtCreate: EstmtCreateScreen,
  EstmtDetail: EstmtDetailScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: '견적서',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'documents'}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: '경매',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'hand'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: '이사업체',
  tabBarIcon: ({ focused }) => (
    <TabBarFoundationIcon
      focused={focused}
      name={'torso-business'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
