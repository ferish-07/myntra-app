import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

export default function Login() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            width: '80%',
            padding: 5,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
