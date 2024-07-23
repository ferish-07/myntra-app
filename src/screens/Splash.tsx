import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

export default function Splash({navigation}: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('BottomTab');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Splash</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
