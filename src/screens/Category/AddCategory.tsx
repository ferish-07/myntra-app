import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Common/Header';

export default function AddCategory({navigation}: any) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'Manage Category'} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
