import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Common/Header';
import CardView from '../Common/CardView';

export default function AddCategory({navigation}: any) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'Manage Category'} navigation={navigation} />
      <ScrollView style={{height: '98%'}}>
        <CardView
          title="Add Main Category"
          cardStyle={{
            backgroundColor: 'white',
            width: '80%',
            elevation: 2,
            borderRadius: 5,
            alignItems: 'center',
            // height: 40,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            padding: 8,
          }}
          marginTop={10}
          isTextInput={true}
          placeholder="Type Category here..."
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
