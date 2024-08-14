import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Fonts} from '../../utils/assets/fonts';
interface ScreenProps {
  title: string;
  navigation?: any;
  isBack?: boolean;
  isHomePage?: boolean;
}
export default function Header({
  title,
  navigation,
  isBack = true,
  isHomePage = false,
}: ScreenProps) {
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
        padding: 10,
        flexDirection: 'row',
      }}>
      {isBack ? (
        <TouchableOpacity
          style={{
            //   backgroundColor: 'red',
            padding: 3,
            position: 'absolute',
            left: 1,
          }}
          onPress={() => navigation.goBack()}>
          <Text
            style={{fontSize: 18, fontFamily: Fonts.myntra, color: 'black'}}>
            {'arrow-left-solid'}
          </Text>
        </TouchableOpacity>
      ) : null}
      <Text style={{fontSize: 18, color: 'black'}}>{title}</Text>
      {isHomePage ? (
        <TouchableOpacity
          style={{
            //   backgroundColor: 'red',
            padding: 3,
            position: 'absolute',
            right: 1,
          }}>
          <Text
            style={{fontSize: 25, fontFamily: Fonts.myntra, color: 'black'}}>
            {'wishlist'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
