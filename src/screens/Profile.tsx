import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {Fonts} from '../utils/assets/fonts';

import {SvgXml} from 'react-native-svg';
import LoginModal from './Common/LoginModal';
export default function Profile() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  useEffect(() => {
    console.log('----in profile tab');
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.container3}>
          <ImageBackground
            source={{
              uri: 'https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png',
            }}
            style={styles.sprite}
            imageStyle={styles.spritesHeaderLogo}
          />
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ff3f6c',
              width: '50%',
              padding: 10,
              borderRadius: 8,
              marginLeft: 10,
            }}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: 'white', fontSize: 18}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoginModal
        modalIsVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // overflow: 'hidden',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container3: {
    backgroundColor: 'white',
    width: 65,
    height: 65,
    // flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
    // padding: 10,
    // alignContent: 'center',
    alignItems: 'center',
  },
  sprite: {
    width: 53,
    height: 36,
    overflow: 'hidden',
  },
  spritesHeaderLogo: {
    resizeMode: 'cover',
    width: 1404, // Width of the entire sprite sheet
    height: 105, // Height of the entire sprite sheet
    marginLeft: -461, // Negative margin to shift the image to the left
    marginTop: 0, // Negative margin to shift the image up
  },
});
