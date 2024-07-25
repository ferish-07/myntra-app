import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Fonts} from '../../utils/assets/fonts';
interface ScreenProps {
  title: string;
  navigation: any;
}
export default function Header({title, navigation}: ScreenProps) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        // height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        // height: 200,
        // borderWidth: Platform.OS == 'android' ? 0.5 : 0.2,
        // borderColor: '#7D7D7D',
        shadowRadius: 2,
        shadowOpacity: 0.1,

        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowColor: '#000',
        padding: 5,
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        style={{
          //   backgroundColor: 'red',
          padding: 3,
          position: 'absolute',
          left: 1,
        }}
        onPress={() => navigation.goBack()}>
        <Text style={{fontSize: 18, fontFamily: Fonts.myntra}}>
          {'arrow-left-solid'}
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize: 18}}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
