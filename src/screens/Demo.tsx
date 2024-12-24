import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Platform, PermissionsAndroid } from 'react-native';
import { Fonts } from '../utils/assets/fonts';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  GDrive } from '@robinbobin/react-native-google-drive-api-wrapper'
import axios from 'axios';
import RNBlobUtil from 'react-native-blob-util';
type Item = {
  [key: string]: any;
};
//drive.google.com/file/d/1CZSFZD3gT_1ErpbC-tbiNJ66Mge8vKUg/view
const RenderData = ({ item, signIn,getDriveFiles }: { item: Item; signIn: () => void,getDriveFiles: () => void }) => {
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
      <View style={{ flex: 2, justifyContent: 'center' }}>
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
          // await AsyncStorage.clear()
          const access_token = await AsyncStorage.getItem('access_token');
          let accessToken: any;
          if (access_token) {
            accessToken = access_token;
            const userInfo = await GoogleSignin.getCurrentUser();
            getDriveFiles()
            console.log('--here is access token', userInfo);
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
  async function fetchDriveFiles() {
    try {
      // Sign in to get the user's access token
      const userInfo = await GoogleSignin.signIn();
      // const accessToken = userInfo.access;
      const access_token = await AsyncStorage.getItem('access_token');

  
      if (!access_token) {
        console.error('Access token is missing');
        return;
      }
  
      // Configure GDrive instance with the access token
      const gDrive = new GDrive();
      gDrive.accessToken = access_token;
  
      // Fetch file metadata
      const filesResponse = await gDrive.files.list({
        q: "'me' in owners or sharedWithMe", // Owned or shared files
        fields: 'files(id, name, mimeType)', // Specify fields to fetch
        // pageSize: 100, // Optional: Limit the number of results
      });
  
      console.log('Drive Files:', filesResponse);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }
  
 
  // const downloadPDF = async () => {
  //   try {
  //     // Define the path where you want to save the PDF
  //     const filePath = `${RNBlobUtil.fs.dirs.DocumentDir}/${"doc.pdf"}`;

  //     // Start downloading the PDF from the URL
  //     const res = await RNBlobUtil.config({
  //       fileCache: true, // Cache the file on disk
  //     }).fetch('GET', "https://files.testfile.org/PDF/100MB-TESTFILE.ORG.pdf").progress((recieved,total)=> console.log("-------> ",( recieved/total)*100)) // Make the GET request to fetch the file

  //     // Save the downloaded file to the specified path
  //     // await res.flush(); // Ensure the file is written to disk

  //     // Get the path of the downloaded file
  //     const path = res.path(); // The file's path after download

  //     // Check if the file exists at the given path
  //     const fileExists = await RNBlobUtil.fs.exists(path);

  //     if (fileExists) {
  //       Alert.alert('Download Complete', `File saved at: ${path}`);
  //     } else {
  //       Alert.alert('Download Failed', 'The file could not be saved.');
  //     }
  //   } catch (error) {
  //     // Handle download error
  //     Alert.alert('Download Error', `Failed to download file: ${error.message}`);
  //   }
  // };
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to save files',
        },
      );
      console.log("granted",granted)
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // No permission needed for iOS
  };
  const savePDF = async (base64String:string) => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage permission is required');
      return;
    }

    try {
      // Define the path where you want to save the PDF (Android Downloads folder)
      const downloadPath = `${RNBlobUtil.fs.dirs.DownloadDir}/downloaded-file.pdf`;

      // Convert base64 to a file and save it to the download folder
      await RNBlobUtil.fs.writeFile(downloadPath, base64String, 'base64');

      // Check if the file is saved
      const fileExists = await RNBlobUtil.fs.exists(downloadPath);

      if (fileExists) {
        Alert.alert('Download Complete', `File saved at: ${downloadPath}`);
      } else {
        Alert.alert('Download Failed', 'The file could not be saved.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to save file: ${error.message}`);
    }
  };

  const readFileContent = async (fileId="1ScPDjI2hMMR0aC2CiViESSGk2RZZep7W") => {
    const accessToken = await signIn();
    if (!accessToken) return;

    const fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

    try {
      const response = await axios.get(fileUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'text', // We expect plain text content
      });
      // console.log("=------------------=don", response.data)
      savePDF(response.data)
      // setFileContent(response.data); // Save file content in state
      // Alert.alert('File Content Loaded');
    } catch (error) {
      console.error(error)
      // Alert.alert('Error Reading File', error.message);
    }
  };

  
  useEffect(() => {
 
    async function signIn() {
      try {
        let response = await GoogleSignin.configure({
          webClientId:
            '391122158812-gu442o44r83nnntki3ldt4lgfj9chgv4.apps.googleusercontent.com', // From client_id.json
          offlineAccess: false, // If you want to obtain a refresh token
          scopes: ['https://www.googleapis.com/auth/drive'],
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
      const { idToken } = await GoogleSignin.getTokens();
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
        renderItem={({ item }) => <RenderData item={item} signIn={signIn} getDriveFiles={readFileContent} />}
        style={{ height: '90%' }}
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
