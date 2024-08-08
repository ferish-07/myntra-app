import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import Header from './Common/Header';
import LoginModal from './Common/LoginModal';
import {Images} from '../utils/assets/fonts';

export default function Order({route, navigation}: any) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const {isLoggedIn} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Orders" navigation={navigation} />
      {isLoggedIn ? null : (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Images.mobileLoginIn}
              style={{height: 200, width: 200, marginBottom: 25}}
            />
            <Text style={{fontSize: 18}}>Please Login to view your Orders</Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#ff3f6c',
                // width: '50%',
                padding: 10,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
          <LoginModal
            modalIsVisible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
