import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Fonts} from '../utils/assets/fonts';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Item = {
  [key: string]: any;
};
//drive.google.com/file/d/1CZSFZD3gT_1ErpbC-tbiNJ66Mge8vKUg/view
const RenderData = ({item, signIn}: {item: Item; signIn: () => void}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 5,
        padding: 10,
        flexDirection: 'row',
      }}>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Text>{item.title}</Text>
      </View>
      <TouchableOpacity
        style={{
          flex: 0.2,
          // backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}
        onPress={async () => {
          setIsDownloading(true);
          const access_token = await AsyncStorage.getItem('access_token');
          let accessToken: any;
          if (access_token) {
            accessToken = access_token;
            console.log('--here is access token', accessToken);
          } else {
            accessToken = await signIn();
            await AsyncStorage.setItem(
              'access_token',
              JSON.stringify(accessToken),
            );
          }
        }}>
        {!isDownloading ? (
          <Text
            style={{
              fontFamily: Fonts.myntra,
              fontSize: 18,
            }}>
            {'download'}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: Fonts.myntra,
              fontSize: 18,
            }}>
            {'download-completed'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const Demo = () => {
  const sampleData = [
    {
      title: 'OL',
      data: 'base64 link',
    },
    {
      title: 'Info Sheet',
      data: 'base64 link 2',
    },
  ];
  useEffect(() => {
    async function signIn() {
      try {
        let response = await GoogleSignin.configure({
          webClientId:
            '391122158812-gu442o44r83nnntki3ldt4lgfj9chgv4.apps.googleusercontent.com', // From client_id.json
          offlineAccess: false, // If you want to obtain a refresh token
          scopes: ['https://www.googleapis.com/auth/drive.file'],
          iosClientId:
            '391122158812-1bh5uhheqki8f6jjiefm0u2o2fm3mkdi.apps.googleusercontent.com',
        });

        console.log('---------', response);
        // await GoogleSignin.hasPlayServices();
        // const userInfo = await GoogleSignin.signIn();
        // console.log('User Info:', userInfo);

        // // Get access token
        // const {idToken} = await GoogleSignin.getTokens();
        // console.log('ID Token:', idToken);
      } catch (error) {
        console.error(error, 'eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrr');
      }
    }
    signIn();
  }, []);
  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      // Get access token
      const {idToken} = await GoogleSignin.getTokens();
      const accessToken = (await GoogleSignin.getTokens()).accessToken;
      console.log('ID Token:', accessToken, '---------------------', idToken);
      return accessToken;
    } catch (error) {
      console.error(error, 'eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrr');
    }
  }
  return (
    <View>
      <FlatList
        data={sampleData}
        renderItem={({item}) => <RenderData item={item} signIn={signIn} />}
        style={{height: '90%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    position: 'absolute',
    top: '50%',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25,
  },
  halfBorder: {
    width: 50,
    height: 25,
    borderTopWidth: 2, // Set the desired border width
    borderColor: 'black',
    borderRadius: 25,
    position: 'absolute',
    top: 0,
  },
  circleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Demo;
