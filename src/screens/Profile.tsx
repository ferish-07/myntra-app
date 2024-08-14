import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {Fonts, Images} from '../utils/assets/fonts';

import {SvgXml} from 'react-native-svg';
import LoginModal from './Common/LoginModal';
import Header from './Common/Header';
export default function Profile({navigation}: any) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    console.log('----in profile tab');
  }, []);
  // const ProfileHeader = () => {
  //   return (
  //     <View style={{backgroundColor: 'red'}}>
  //       <Text>{'<-'}</Text>
  //     </View>
  //   );
  // };
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={{backgroundColor: 'white', marginTop: 45}}>
        {isLoggedIn ? (
          <>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Image
                source={Images.myprofile}
                style={{width: 100, height: 100, borderRadius: 100}}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 100,
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  bottom: 8,
                  right: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#DDDDDD',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 5,
                  elevation: 1,
                }}>
                <Text style={{fontFamily: Fonts.myntra}}>{'edit'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10, alignItems: 'center'}}>
              <Text style={{fontWeight: '800', fontSize: 18}}>Ferish Modi</Text>
              <Text style={{color: 'gray', fontSize: 16}}>
                modiferish@gmail.com
              </Text>
            </View>
          </>
        ) : (
          <>
            <View style={{margin: 10, marginHorizontal: 30}}>
              <Text style={{fontWeight: '500', fontSize: 22, letterSpacing: 1}}>
                Profile
              </Text>
              <Text style={{fontSize: 18, marginTop: 10}}>
                Unlock Your Personalized Shopping Experience
              </Text>
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
          </>
        )}
      </View>
      <View style={{margin: 10, marginHorizontal: 30}}>
        <TouchableOpacity
          style={{
            // width: '90%',
            backgroundColor: '#f2f6fc',
            marginTop: 10,
            padding: 10,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() =>
            navigation.navigate('Orders', {isLoggedIn: isLoggedIn})
          }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25, fontFamily: Fonts.myntra}}>
              {'orders'}
            </Text>
            <Text style={{fontSize: 16}}> Orders</Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.myntra,
              transform: [{rotate: '180deg'}],
              // backgroundColor: 'red',
            }}>
            {'arrow-left-solid'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#f2f6fc',
            marginTop: 10,
            padding: 10,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25, fontFamily: Fonts.myntra}}>
              {'wishlist'}
            </Text>
            <Text style={{fontSize: 16}}> Wishlist</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.myntra,
              transform: [{rotate: '180deg'}],
              // backgroundColor: 'red',
            }}>
            {'arrow-left-solid'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#f2f6fc',
            marginTop: 10,
            padding: 10,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontFamily: Fonts.myntra}}>
              {'settings'}
            </Text>
            <Text style={{fontSize: 16}}> Settings</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.myntra,
              transform: [{rotate: '180deg'}],
              // backgroundColor: 'red',
            }}>
            {'arrow-left-solid'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#f2f6fc',
            marginTop: 10,
            padding: 10,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16}}>Refer a friend</Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.myntra,
              transform: [{rotate: '180deg'}],
              // backgroundColor: 'red',
            }}>
            {'arrow-left-solid'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#f2f6fc',
            marginTop: 10,
            padding: 10,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16}}>Coupons</Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.myntra,
              transform: [{rotate: '180deg'}],
              // backgroundColor: 'red',
            }}>
            {'arrow-left-solid'}
          </Text>
        </TouchableOpacity>
        {isLoggedIn ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#f2f6fc',
              marginTop: 10,
              padding: 10,
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => Alert.alert('LOG OUT !')}>
            <Text style={{fontSize: 16}}>Logout</Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.myntra,
                transform: [{rotate: '180deg'}],
                // backgroundColor: 'red',
              }}>
              {'arrow-left-solid'}
            </Text>
          </TouchableOpacity>
        ) : null}
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
// {
//   /* <ImageBackground
//           source={{
//             uri: 'https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png',
//           }}
//           style={styles.sprite}
//           imageStyle={styles.spritesHeaderLogo}
//         /> */
// }
