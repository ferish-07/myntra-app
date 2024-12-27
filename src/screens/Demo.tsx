import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Fonts} from '../utils/assets/fonts';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GDrive} from '@robinbobin/react-native-google-drive-api-wrapper';
import axios from 'axios';
import RNBlobUtil from 'react-native-blob-util';
import CircularProgress from 'react-native-circular-progress-indicator';
import ViewFileModal from './Common/ViewFileModal';
import FileViewer from 'react-native-file-viewer';
type Item = {
  [key: string]: any;
};
//drive.google.com/file/d/1CZSFZD3gT_1ErpbC-tbiNJ66Mge8vKUg/view
const RenderData = ({
  item,
  signIn,
  getDriveFiles,
  progressPercent,
  checkFileExistace,
  viewFile,
}: // isDownloading,
{
  item: Item;
  signIn: () => void;
  getDriveFiles: (item: string, filename: string) => Promise<boolean>;
  progressPercent: number;
  checkFileExistace: (item: string) => Promise<boolean>;
  viewFile: (item: string) => void;
  // isDownloading: {};
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  // const [isDownloaded, setIsDownloaded] = useState(false);

  const [isExits, setIsExits] = useState<boolean | null>(null);
  useEffect(() => {
    const checkExistence = async () => {
      const exists = await checkFileExistace(item.title);
      setIsExits(exists);
    };
    checkExistence();
    // setIsDownloadings(isDownloading);
  }, [item.title, checkFileExistace, isDownloading]);
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
          if (isExits && !isDownloading) {
            viewFile(item.title);
          } else {
            // await AsyncStorage.clear()
            const access_token = await AsyncStorage.getItem('access_token');
            let accessToken: any;
            if (access_token) {
              accessToken = access_token;
              const userInfo = await GoogleSignin.getCurrentUser();
              // getDriveFiles(item.data, item.title);\
              setIsDownloading(true);
              try {
                await getDriveFiles(item.data, item.title);
                // setIsDownloaded(true);
              } catch (error) {
                console.error('Download failed:', error);
              } finally {
                console.log('finalyyy......');
                setIsDownloading(false);
              }
            } else {
              accessToken = await signIn();
              await AsyncStorage.setItem(
                'access_token',
                JSON.stringify(accessToken),
              );
            }
          }
        }}>
        <>
          {/* {console.log('isExits', isExits)} */}
          {isExits && !isDownloading ? (
            <>
              <Text>View</Text>
            </>
          ) : !isDownloading ? (
            <Text
              style={{
                fontFamily: Fonts.myntra,
                fontSize: 18,
              }}>
              {'download'}
            </Text>
          ) : (
            //Loader
            <CircularProgress
              radius={8}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              value={progressPercent}
              inActiveStrokeColor={'#2ecc71'}
              inActiveStrokeOpacity={0.2}
              progressValueColor={'red'}
              valueSuffix={'%'}
              showProgressValue={false}
              onAnimationComplete={() => {
                // alert('callback');
                console.log('-->> compeleted');
              }}
            />
          )}
        </>
      </TouchableOpacity>
    </View>
  );
};
const Demo = () => {
  const sampleData = [
    {
      title: 'OL',
      data: '12Nx4AV-tekx-yTGJHosaAFT79faOkJaS',
    },
    {
      title: 'Info_Sheet',
      data: '1ScPDjI2hMMR0aC2CiViESSGk2RZZep7W',
    },
  ];
  const [progressPercent, setProgressPercent] = useState(0);
  const [isDownloading, setIsDownloading] = useState({});
  const [viewFile, setViewFile] = useState(false);
  const [filepath, setFilePath] = useState({});
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

  const downloadPDF = async (file_data: any, file_name: string) => {
    try {
      // Define the path where you want to save the PDF
      const filePath = `${RNBlobUtil.fs.dirs.DocumentDir}/Myntra/${file_name}.pdf`;

      // Start downloading the PDF from the URL
      const res = await RNBlobUtil.config({
        fileCache: true, // Cache the file on disk
        path: filePath,
      })
        .fetch('GET', 'https://files.testfile.org/PDF/100MB-TESTFILE.ORG.pdf')
        .progress((recieved, total) => {
          let procressPercents = (recieved / total) * 100;
          console.log('perc', procressPercents);
          setProgressPercent(procressPercents);
        }); // Make the GET request to fetch the file

      // Save the downloaded file to the specified path
      // await res.flush(); // Ensure the file is written to disk

      // Get the path of the downloaded file
      const path = res.path(); // The file's path after download
      console.log('-------path', path);
      setFilePath(path);

      // Check if the file exists at the given path
      const fileExists = await RNBlobUtil.fs.exists(path);

      if (fileExists) {
        Alert.alert('Download Complete', `File saved at: ${path}`);
      } else {
        Alert.alert('Download Failed', 'The file could not be saved.');
      }
    } catch (error) {
      // Handle download error
      Alert.alert(
        'Download Error',
        `Failed to download file: ${error.message}`,
      );
    }
  };
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to save files',
        },
      );
      console.log('granted', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // No permission needed for iOS
  };
  const savePDF = async (
    base64String: string,
    file_name: string,
    fileId: string,
  ) => {
    try {
      // Path to the app's Documents directory
      // console.log('file_name------', file_name);
      // let file_name = 'OL';
      const documentsPath =
        Platform.OS == 'ios'
          ? RNBlobUtil.fs.dirs.DocumentDir
          : RNBlobUtil.fs.dirs.DownloadDir;
      const folderName = 'Myntra';
      const fileName = `${file_name}.pdf`;
      const folderPath = `${documentsPath}/${folderName}`;
      const filePath = `${folderPath}/${fileName}`;

      // Check and create folder
      const folderExists = await RNBlobUtil.fs.exists(folderPath);
      // console.log('fileName-=-', fileName);
      if (!folderExists) {
        await RNBlobUtil.fs.mkdir(folderPath);
        console.log('Folder created at:', folderPath);
      }

      // Write the file
      // console.log('filePath 11', filePath);
      await RNBlobUtil.fs.writeFile(filePath, base64String, 'base64');
      // console.log('filePath 22', filePath);

      // Confirm the file exists
      const fileExists = await RNBlobUtil.fs.exists(filePath);
      if (fileExists) {
        Alert.alert(
          'Download Complete',
          Platform.OS === 'ios'
            ? `File saved. Use the Files app to access it under ${folderName}`
            : `File saved at: ${filePath}`,
        );
        setIsDownloading({fileId: fileId, downloading: false});
      } else {
        throw new Error('File not saved');
      }
    } catch (error) {
      console.error('Save PDF Error:', error);
      Alert.alert('Error', `Failed to save file: ${error.message}`);
      setIsDownloading({fileId: fileId, downloading: false});
    }
  };
  const checkFileExistace = async (title: string) => {
    console.log('----chrekcv', title);
    const documentsPath =
      Platform.OS == 'ios'
        ? RNBlobUtil.fs.dirs.DocumentDir
        : RNBlobUtil.fs.dirs.DownloadDir;
    const folderName = 'Myntra';
    const fileName = `${title}.pdf`;
    const folderPath = `${documentsPath}/${folderName}`;
    const filePath = `${folderPath}/${fileName}`;

    // Check and create folder
    // console.log('filePath', filePath);
    const fileExists = await RNBlobUtil.fs.exists(filePath);
    if (fileExists) return true;
  };

  const readFileContent = async (fileId: string, fileName: string) => {
    // console.log('fileeee idd', fileId);
    let file_id = fileId.toString();
    setIsDownloading({fileId: fileId, downloading: true});
    const accessToken = await signIn();
    if (!accessToken) return;

    const fileUrl = `https://www.googleapis.com/drive/v3/files/${file_id}?alt=media`;

    try {
      const response = await axios.get(fileUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'text', // We expect plain text content
      });
      console.log('file urllll----', fileUrl);
      // console.log('=------------------=don', JSON.stringify(response));
      savePDF(response.data, fileName, fileId);
      // setFileContent(response.data); // Save file content in state
      // Alert.alert('File Content Loaded');
    } catch (error) {
      console.error(error);
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
      const access_token = await AsyncStorage.getItem('access_token');
      let userInfo;
      if (!access_token) {
        userInfo = await GoogleSignin.signIn();
      }
      console.log('User Info:', userInfo);

      // Get access token
      const {idToken} = await GoogleSignin.getTokens();
      const accessToken = (await GoogleSignin.getTokens()).accessToken;
      console.log('ID Token:', accessToken, '---------------------', idToken);
      return accessToken;
    } catch (error) {
      console.error(error, 'eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrr Fer');
      await AsyncStorage.removeItem('access_token');
      setTimeout(async () => {
        let access_token: any;
        access_token = await signIn();
        await AsyncStorage.setItem('access_token', access_token);
      }, 1000);
    }
  }
  const onClose = () => {
    setViewFile(false);
  };
  const ViewFiles = async (title: string) => {
    const documentsPath =
      Platform.OS == 'ios'
        ? RNBlobUtil.fs.dirs.DocumentDir
        : RNBlobUtil.fs.dirs.DownloadDir;
    const folderName = 'Myntra';
    const fileName = `${title}.pdf`;
    const folderPath = `${documentsPath}/${folderName}`;
    const filePath = `${folderPath}/${fileName}`;
    // console.log('----', filePath);
    // let fileP = {path: filePath, name: title};
    // setFilePath(fileP);
    // setViewFile(true);
    await FileViewer.open(filePath, {showOpenWithDialog: true}) // absolute-path-to-my-local-file.
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  };
  return (
    <View>
      <FlatList
        data={sampleData}
        renderItem={({item}) => (
          <RenderData
            item={item}
            signIn={signIn}
            getDriveFiles={readFileContent}
            progressPercent={progressPercent}
            checkFileExistace={async item => await checkFileExistace(item)}
            viewFile={ViewFiles}
            // isDownloading={isDownloading}
          />
        )}
        style={{height: '50%'}}
      />
      <ViewFileModal
        isVisible={viewFile}
        onClose={onClose}
        filepath={filepath}
        title=""
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
