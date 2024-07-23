import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

export default function Home() {
  useEffect(() => {
    console.log('----in Home tab');
  }, []);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
