import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Splash from './Splash';
import BottomTabNavigator from './BottomTabNavigator';
import AddCategory from './Category/AddCategory';
import Order from './Order';
import Profile from './Profile';
import Drawer from './Drawer/Drawer';
import Category from './Category/Category';
import Home from './Home';
import Products from './Category/Products';
import ProductDetails from './Category/ProductDetails';

export default function Router() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Drawer" component={Drawer} /> */}
        <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
        <Stack.Screen name="Orders" component={Order} />
        <Stack.Screen name="Category_List" component={Category} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Product_details" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
