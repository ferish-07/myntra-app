import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Splash from './Splash';
import BottomTabNavigator from './BottomTabNavigator';
import Home from './Home';
import Profile from './Profile';
import AddCategory from './Category/AddCategory';

export default function Router() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
