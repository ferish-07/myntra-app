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
  ActivityIndicator,
  Alert,
  FlatList,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Common/Header';
import CardView from '../Common/CardView';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';

import RNFS from 'react-native-fs';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {Buffer} from 'buffer';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Fonts} from '../../utils/assets/fonts';
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
  const [productUploadData, setProductUploadData] = useState<any>(null);
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
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
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
  const [photoList, setPhotoList] = useState<any>([]);
  const [imageIds, setImageIds] = useState<any>([]);
  const [isUpLoading, setIsUploading] = useState<boolean>(false);
  const [singleFile, setSingleFile] = useState<any>(null);

  const openActionSheet = async () => {
    if (Platform.OS == 'ios') {
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
    } else {
      Alert.alert('Select...', 'Please select any one option to Upload photo', [
        {text: 'Cancel', onPress: () => {}},
        {
          text: 'Select From library',
          onPress: () => {
            selectImage('photo');
          },
        },
        {
          text: 'Take Photo',
          onPress: () => {
            selectImage('camera');
          },
        },
      ]);
    }
  };
  async function selectImage(type: string) {
    if (type == 'camera') {
      await launchCamera({mediaType: 'mixed'}, response => {
        console.log('---response', response);
        if (response.assets && response.assets.length > 0) {
          const photo = response.assets;
          setPhotoList(photo);
          // console.log('0-----hjhj--------', photo);
          // uploadToGoogleDrive(photo);
          // return photo;
          // Now you can use this photo for uploading
        }
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
            setPhotoList(photo);
            // console.log('0-----hjhj--------', photo);
            // uploadToGoogleDrive(photo);
            // return photo;
            // Now you can use this photo for uploading
          }
        },
      );
    }
  }
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      setSingleFile(res);
      console.log('FILEEEEEEEE', res);
    } catch (err) {
      setSingleFile(null);
      console.log('----->Error', err);
    }
  };
  const useExcel = async () => {
    const filePath =
      singleFile && singleFile.length && singleFile[0]?.uri
        ? singleFile[0]?.uri
        : '';
    console.log('filePath', filePath);
    try {
      const fileContent = await RNFS.readFile(filePath, 'base64');
      const workbook = XLSX.read(fileContent, {type: 'base64'});
      const sheetName = workbook.SheetNames[0];

      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log('{====>FILE CONTENT}', sheetName, sheetData);

      const groupedData = {};
      sheetData.map((i: any, index: number) => {
        i.isExpanded = false;
        i.index = index + 1;
      });
      setProductUploadData(sheetData);
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  };

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
    let newArr = [];
    const access_token = await AsyncStorage.getItem('access_token');
    let accessToken: any;
    if (access_token) {
      accessToken = access_token;
    } else {
      accessToken = await signIn();
      await AsyncStorage.setItem('access_token', JSON.stringify(accessToken));
    }
    setIsUploading(true);
    const uploadFile = async (photos: any, fileName: any) => {
      console.log('---asas', photos);
      const fileMetadata = {
        name: photos.fileName,
        mimeType: 'image/jpeg',
        parents: ['146iYBKtZlqwfQFpZoJNGX-t4dhNq6hj9'],
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
        response.data.isLoading = false;
        newArr.push(response.data);
        console.log('----new arr', newArr);
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
            // openActionSheet();
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
    setImageIds(newArr);
    setIsUploading(false);
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
  const removeImage = (item: any, index: any) => {
    const newArr = [...photoList];
    newArr.splice(index, 1);
    setPhotoList(newArr);
  };
  const ImageItem = ({item}: any) => {
    console.log('=====>>>', item);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
      <View>
        {isLoading ? (
          <ActivityIndicator
            style={{
              // backgroundColor: 'red',
              zIndex: 1,
              position: 'absolute',
              // backgroundColor: 'red',
              width: 100,
              height: 100,
            }}
            size={'large'}
          />
        ) : null}
        <Image
          source={{
            // https://drive.google.com/file/d/1rzKAV5sXLYWcVBWBGDpwCyEUBWtb1PF0/view?pli=1
            uri: `https://drive.google.com/uc?export=view&id=${item.id}`,
          }}
          onLoad={e => {
            console.log('load ', e.nativeEvent);
            setIsLoading(false);
          }}
          onLoadStart={() => {
            console.log('load start');
            setIsLoading(true);
          }}
          onLoadEnd={() => {
            console.log('load end');
            setIsLoading(false);
          }}
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'white',
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  const RenderContent = ({item, index}: any) => {
    // const [isExpanded, setIsExpanded] = useState(item.isExpanded);
    return (
      <>
        <TouchableOpacity
          style={{
            padding: 12,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: item.isExpanded ? 0 : 10,
            borderBottomRightRadius: item.isExpanded ? 0 : 10,
            backgroundColor: item.isExpanded ? '#D6EAF8' + 60 : '#f8f8f8',
            // color: '#eee',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: '#003c98' + 30,
            borderWidth: item.isExpanded ? 0 : 1.2,
          }}
          onPress={() => {
            let new_data = [...productUploadData];
            new_data.map((i: any) => {
              if (item.index == i.index) {
                i.isExpanded = !i.isExpanded;
              } else {
                i.isExpanded = false;
              }
            });
            setProductUploadData(new_data);
          }}>
          <Text>{`Product ${index + 1}`}</Text>
        </TouchableOpacity>
        {item.isExpanded && (
          <View
            style={{
              // marginLeft: 15,
              paddingVertical: 5,
              backgroundColor: '#f8f8f8',
              // marginTop: 4,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <Text style={{marginLeft: 15}}>
              Product Name: {item.Product_name}
            </Text>
            <Text style={{marginLeft: 15}}>Brand: {item.company_name}</Text>
            <Text style={{marginLeft: 15}}>
              Description: {item.Product_description}
            </Text>
            <Text style={{marginLeft: 15}}>Prize: {item.prize}</Text>
            <Text style={{marginLeft: 15}}>
              Discount: {`${item.discount}%`}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginLeft: 15}}>Size:</Text>
              <FlatList
                data={JSON.parse(item.size_list)}
                horizontal
                renderItem={({item: items, index}) => {
                  return (
                    <View>
                      <Text>{items.size}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        )}
      </>
    );
  };
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
          <CardView
            title="Main Category"
            marginTop={5}
            isTextInput={true}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={['Category Name']}
            textInputCount={1}
            onSubmitClick={obj => {
              console.log('-----', obj);
              setNewValue(obj);
            }}
          />
          <CardView
            title="Section"
            marginTop={5}
            isDropDown={true}
            dropDownData={dropdownData}
            dropDownCount={2}
            isTextInput={true}
            placeholder={['Section Name']}
            textInputCount={1}
            onSubmitClick={obj => {
              console.log('-----', obj);
              setValue(obj);
            }}
          />
          <CardView
            title="Sub Section"
            marginTop={5}
            isDropDown={true}
            dropDownData={dropdownData}
            dropDownCount={1}
            isTextInput={true}
            placeholder={['Sub Section Name']}
            textInputCount={1}
            onSubmitClick={obj => {
              console.log('-----', obj);
              setValue(obj);
            }}
          />
          <CardView
            title="Upload Image"
            marginTop={5}
            isTextInput={false}
            isDropDown={false}
            dropDownData={dropdownData}
            // placeholder={[]}
            // textInputCount={5}
            onSubmitClick={() => openActionSheet()}
            buttonView={false}>
            <>
              {/* <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  margin: 5,
                  elevation: 2,
                  borderRadius: 5,
                  alignItems: 'center',
                  // height: 40,
                  // shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  paddingRight: 10,
                  // marginHorizontal: 20,
                  // flexWrap: 'wrap',
                }}
                scrollEnabled={true}
                horizontal>
                {photoList.map((i: any, index: any) => (
                  <View
                    style={{
                      margin: 5,
                    }}>
                    <Image
                      source={{
                        // https://drive.google.com/file/d/1rzKAV5sXLYWcVBWBGDpwCyEUBWtb1PF0/view?pli=1
                        uri: i.uri,
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
                      style={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'white',
                      }}
                      resizeMode="contain"
                    />

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: -5,
                        backgroundColor: 'grey',
                        borderRadius: 100,
                        height: 20,
                        width: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: -5,
                      }}
                      onPress={() => removeImage(i, index)}>
                      <Text style={{fontFamily: Fonts.myntra}}>{'close'}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView> */}
              <FlatList
                data={productUploadData}
                style={{width: '100%'}}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <RenderContent item={item} index={index} />
                    </>
                  );
                }}
              />
              <View
                style={{
                  marginTop: 10,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                {/* <TouchableOpacity
                  style={{
                    width: '30%',
                    backgroundColor: '#1976D2',
                    padding: 8,
                    elevation: 2,
                    borderRadius: 5,
                    alignItems: 'center',
                    // height: 40,
                    // shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    marginLeft: 8,
                  }}
                  onPress={() => openActionSheet()}>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Select Image
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={{
                    width: '35%',
                    backgroundColor: '#1976D2',
                    padding: 8,
                    elevation: 2,
                    borderRadius: 5,
                    alignItems: 'center',
                    // height: 40,
                    // shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    marginLeft: 8,
                  }}
                  onPress={() => {
                    singleFile ? useExcel() : selectFile();
                  }}>
                  <Text style={{color: 'white', fontSize: 18}}>
                    Upload Excel
                  </Text>
                </TouchableOpacity>
                {/* {photoList.length > 0 && (
                  <TouchableOpacity
                    style={{
                      width: '35%',
                      backgroundColor: '#1976D2',
                      padding: 8,
                      elevation: 2,
                      borderRadius: 5,
                      alignItems: 'center',
                      // height: 40,
                      // shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      marginLeft: 8,
                    }}
                    onPress={() => uploadToGoogleDrive(photoList)}>
                    {isUpLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <Text style={{color: 'white', fontSize: 16}}>
                        Upload Image
                      </Text>
                    )}
                  </TouchableOpacity>
                )} */}
              </View>
            </>
          </CardView>
          {imageIds.length > 0 &&
            imageIds.map((i: any) => {
              console.log('-->>', i.id);
              return (
                <View>
                  <ImageItem item={i} />
                </View>
              );
            })}
        </ScrollView>
        {OpenImageModal ? ImagePickerModal() : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '48%',
    // flex: 1,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
