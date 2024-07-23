import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import {Fonts} from '../utils/assets/fonts';
import CustomBottomBar from './CustomBottomBar';
import Demo from './Demo';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
      }}
      tabBar={props => <CustomBottomBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="add" component={Demo} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Demo" component={Demo} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
