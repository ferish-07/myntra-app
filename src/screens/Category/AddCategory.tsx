import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  ActionSheetIOS,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Common/Header';
import CardView from '../Common/CardView';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {Buffer} from 'buffer';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function AddCategory({navigation}: any) {
  const [dropdownData, setDropDownData] = useState([
    {
      placeholder: 'Select Category',
      id: 'main_category',
      data: [
        {
          label: 'Mens',
          value: 'Men',
        },
      ],
    },
    {
      placeholder: 'Select Section',
      id: 'section',
      data: [],
    },
    {
      placeholder: 'Select Sub Section',
      id: 'sub_section',
      data: [],
    },
  ]);
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
  const [value, setValue] = useState<any>(null);
  const [newValue, setNewValue] = useState<any>(null);
  const [OpenImageModal, setOpenImageModal] = useState<boolean>(false);
  const openActionSheet = async () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Select from library', 'Take a photo'],
        cancelButtonIndex: 0,
      },
      async buttonIndex => {
        if (buttonIndex === 1) {
          selectImage('photo');
        } else if (buttonIndex === 2) {
          selectImage('camera');
        }
      },
    );
  };
  async function selectImage(type: string) {
    if (type == 'camera') {
      await launchCamera({mediaType: 'mixed'}, response => {
        console.log('---response', response);
      });
    } else {
      await launchImageLibrary(
        {
          mediaType: 'mixed',
          presentationStyle: 'popover',
          selectionLimit: 5,
        },
        response => {
          console.log('response', response);
          if (response.assets && response.assets.length > 0) {
            const photo = response.assets;
            // console.log('0-----hjhj--------', photo);
            uploadToGoogleDrive(photo);
            // return photo;
            // Now you can use this photo for uploading
          }
        },
      );
    }
  }
  //UPLOAD TO GOOGLE PHOTOS
  // async function uploadToGooglePhotos(photo: any) {
  //   const accessToken = await signIn();
  //   // let photo = await selectImage();
  //   console.log('-------FER---photo-', photo.uri, accessToken, {
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-type': 'application/octet-stream',
  //     'X-Goog-Upload-File-Name': photo.fileName,
  //     'X-Goog-Upload-Protocol': 'raw',
  //   });
  //   const uploadUrl = 'https://photoslibrary.googleapis.com/v1/uploads';
  //   const photoData = await RNFS.readFile(photo.uri, 'base64');
  //   const binaryData = Buffer.from(photoData, 'base64');
  //   // console.log('-binaryData-', binaryData, '--->', photoData);
  //   const response = await axios.post(uploadUrl, binaryData, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-type': 'application/octet-stream',
  //       'X-Goog-Upload-File-Name': photo.fileName,
  //       'X-Goog-Upload-Protocol': 'raw',
  //     },
  //   });

  //   const uploadToken = response.data;
  //   console.log(
  //     '-----------uplooadd tokenb------',
  //     JSON.stringify(uploadToken),
  //   );
  //   handleImageUpload(uploadToken, accessToken);
  //   // Create the media item in Google Photos
  // }
  // async function handleImageUpload(uploadToken, accessToken) {
  //   const mediaItem = await axios.post(
  //     'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate',
  //     {
  //       newMediaItems: [
  //         {
  //           description: 'Photo description',
  //           simpleMediaItem: {
  //             uploadToken: uploadToken,
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     },
  //   );

  //   console.log(JSON.stringify(mediaItem.data), '----------response is here');
  // }
  //UPLOAD TO GOOGLE DRIVE
  async function uploadToGoogleDrive(photos: any) {
    const access_token = await AsyncStorage.getItem('access_token');
    let accessToken;
    if (access_token) {
      accessToken = access_token;
    } else {
      accessToken = await signIn();
      await AsyncStorage.setItem('access_token', JSON.stringify(accessToken));
    }
    const uploadFile = async (photos: any, fileName: any) => {
      console.log('---asas', photos);
      const fileMetadata = {
        name: photos.fileName,
        mimeType: 'image/jpeg',
      };
      const fileBlob = await RNFS.readFile(photos.uri, 'base64');
      // const metadataBlob = new Blob([JSON.stringify(fileMetadata)], {
      //   type: 'application/json',
      // });
      const multipartBody =
        `--boundary123\n` +
        `Content-Type: application/json; charset=UTF-8\n\n` +
        `${JSON.stringify(fileMetadata)}\n` +
        `--boundary123\n` +
        `Content-Type: image/jpeg\n` +
        `Content-Transfer-Encoding: base64\n\n` +
        `${fileBlob}\n` +
        `--boundary123--`;

      try {
        const response = await axios.post(
          'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
          multipartBody,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/related; boundary=boundary123',
            },
          },
        );
        console.log(
          `File ${photos.fileName} uploaded successfully:`,
          response.data,
        );
        return response.data;
      } catch (error: any) {
        console.log(
          'Error uploading file: ',
          error?.response ? error?.response?.data : error.message,
        );
        console.log('error?.response?.data.code', error?.response?.data.error);
        if (error?.response?.data) {
          if (error?.response?.data.error.code == 401) {
            await AsyncStorage.removeItem('access_token');
            let accessToken;

            accessToken = await signIn();
            await AsyncStorage.setItem(
              'access_token',
              JSON.stringify(accessToken),
            );
            openActionSheet();
          }
        }
        throw error;
      }
    };

    for (let i = 0; i < photos.length; i++) {
      const fileName = `image_${i + 1}.jpg`; // Name each file uniquely
      try {
        await uploadFile(photos[i], fileName);
      } catch (error) {
        console.log(
          `Failed to upload ${fileName}, stopping further uploads.`,
          error,
        );
        break; // Stop further uploads if there's an error
      }
    }
    // await AsyncStorage.removeItem('access_token');
    console.log('All files processed sequentially.');
    console.log('------->>>>>>ACCESS TOKEN<<<<------', accessToken);
    // for (let i = 0; i < photos.length; i++) {
    //   console.log('---->>ITMES', photos[i]);
    // }
  }

  const ImagePickerModal = () => {
    return (
      <Modal
        isVisible={OpenImageModal}
        style={{margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard={true}
        swipeDirection="down"
        onSwipeComplete={() => {
          Vibration.vibrate(100);
          setOpenImageModal(false);
        }}
        onBackdropPress={() => setOpenImageModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            height: '30%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            // margin: 50,
          }}>
          <View
            style={{
              marginHorizontal: 25,
              marginTop: 50,
            }}>
            <TouchableOpacity>
              <Text style={{fontSize: 18}}>Choose from library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 25}}>
              <Text style={{fontSize: 18}}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // const [newValue, setValue] = useState<any>(null);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? 80 : 0}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header title={'Manage Category'} navigation={navigation} />
        <ScrollView
          style={{height: '98%', marginTop: 1}}
          keyboardShouldPersistTaps={'always'}>
          {/* <CardView
            title="Demo"
            marginTop={5}
            isTextInput={true}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={['Id', 'Category']}
            textInputCount={2}
            onSubmitClick={obj => {
              console.log('-----', obj);
              setNewValue(obj);
              selectImage();
            }}
          />
          <CardView
            title="USER DETAILS"
            marginTop={5}
            isTextInput={true}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={[
              'First Name',
              'Last Name',
              'Email',
              'Contact Number',
              'Password',
            ]}
            textInputCount={5}
            onSubmitClick={obj => {
              console.log('-----', obj);
              setValue(obj);
            }}
          /> */}
          <CardView
            title="Upload Image"
            marginTop={5}
            isTextInput={false}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={[
              'First Name',
              'Last Name',
              'Email',
              'Contact Number',
              'Password',
            ]}
            imageButton={true}
            // textInputCount={5}
            onSubmitClick={() => openActionSheet()}
            buttonView={false}
          />
          {/* <Image
            source={{
              // https://drive.google.com/file/d/1rzKAV5sXLYWcVBWBGDpwCyEUBWtb1PF0/view?pli=1
              uri: 'https://drive.google.com/uc?export=view&id=1rzKAV5sXLYWcVBWBGDpwCyEUBWtb1PF0',
            }}
            onLoad={e => {
              console.log('load ', e.nativeEvent);
            }}
            onLoadStart={() => {
              console.log('load start');
            }}
            onLoadEnd={() => {
              console.log('load end');
            }}
            style={{width: 200, height: 200, backgroundColor: 'red'}}
          /> */}
          <View
            style={{
              // width: '90%',
              // backgroundColor: 'red',
              // alignSelf: 'center',
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
              flex: 1,
            }}>
            {newValue ? (
              <View style={{borderRadius: 10, borderWidth: 1, padding: 10}}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>DEMO CARD VALUE</Text>
                </View>
                {['Id', 'Category'].map((i, index) => {
                  return (
                    <View>
                      {newValue ? (
                        <>
                          <Text>{`    ${i} - ${newValue?.TextInputValue[index]}`}</Text>
                        </>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ) : null}

            {value ? (
              <View style={{borderRadius: 10, borderWidth: 1, padding: 10}}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>
                    USER DETAILS CARD VALUE
                  </Text>
                </View>
                {[
                  'First Name',
                  'Last Name',
                  'Email',
                  'Contact Number',
                  'Password',
                ].map((i, index) => {
                  return (
                    <View>
                      {value ? (
                        <>
                          <Text>{`   ${i} - ${value?.TextInputValue[index]}`}</Text>
                        </>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ) : null}
          </View>
          {/* <CardView
            title="Add Section"
            marginTop={5}
            isTextInput={true}
            isDropDown={true}
            dropDownData={dropdownData}
            placeholder={['Type here..']}
            textInputCount={1}
            dropDownCount={2}
            onSubmitClick={obj => {
              console.log('-----', obj);
            }}
            onDropDownChange={data => {
              console.log('-------far', data);
              let newData = dropdownData;
              if (data.id == 'main_category') {
                newData[1].data = [
                  {
                    label: 'T-shirt',
                    value: 'T-shirt',
                  },
                ];
              }
              if (data.id == 'section') {
                newData[2].data = [
                  {
                    label: 'long',
                    value: 'long',
                  },
                  {
                    label: 'short',
                    value: 'short',
                  },
                ];
              }
            }}
            onDeletePressed={data => console.log('-----datete', data)}
          />
          <CardView
            title="Add Sub Section"
            marginTop={5}
            isTextInput={true}
            isDropDown={true}
            dropDownData={dropdownData}
            placeholder={['Type here..']}
            textInputCount={1}
            dropDownCount={2}
            onSubmitClick={obj => {
              console.log('-----', obj);
            }}
            onDropDownChange={data => {
              console.log('-------far', data);
              let newData = dropdownData;
              if (data.id == 'main_category') {
                newData[1].data = [
                  {
                    label: 'T-shirt',
                    value: 'T-shirt',
                  },
                ];
              }
              if (data.id == 'section') {
                newData[2].data = [
                  {
                    label: 'long',
                    value: 'long',
                  },
                  {
                    label: 'short',
                    value: 'short',
                  },
                ];
              }
            }}
            onDeletePressed={data => console.log('-----datete', data)}
          />
          <CardView
            title="Add Brands"
            marginTop={5}
            isTextInput={true}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={['Type here..']}
            textInputCount={1}
            onSubmitClick={obj => {
              console.log('-----', obj);
            }}
          />
          <CardView
            title="Add Brands"
            marginTop={5}
            isTextInput={true}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={['Type here..']}
            textInputCount={1}
            onSubmitClick={obj => {
              console.log('-----', obj);
            }}
          /> */}
        </ScrollView>
        {OpenImageModal ? ImagePickerModal() : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
