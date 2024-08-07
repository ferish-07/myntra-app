import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import SlidingComponent from './Common/SlidingComponent';

export default function Home() {
  useEffect(() => {
    console.log('----in Home tab');
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{height: 160}}>
        <SlidingComponent />
      </View>
      <Text>Fer</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
