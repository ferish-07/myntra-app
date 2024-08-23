import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from '../BottomTabNavigator';
export default function Drawer() {
    const Drawer = createDrawerNavigator();
  return (
    // <NavigationContainer>
    <Drawer.Navigator initialRouteName="BottomTab">
      <Drawer.Screen name="BottomTab" component={BottomTabNavigator}  />
    </Drawer.Navigator>
//   </NavigationContainer>
  )
}

const styles = StyleSheet.create({})