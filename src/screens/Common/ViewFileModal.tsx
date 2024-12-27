import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Pdf from 'react-native-pdf';
interface ViewFileModalProps {
  isVisible: boolean;
  onClose: () => void;
  filepath: {
    path: string;
    name: string;
  };
  title: string;
}
export default function ViewFileModal({
  isVisible,
  onClose,
  filepath,
  title,
}: ViewFileModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      style={{
        // backgroundColor: 'red',
        margin: 0,
        // height: '10%',
        justifyContent: 'flex-end',
      }}
      onBackdropPress={onClose}>
      <View
        style={{
          height: '90%',
          // backgroundColor: 'red',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <View>
            <Text>Done</Text>
          </View>
          <Text>{filepath.name}</Text>
          <View>
            <Text>Share</Text>
          </View>
        </View>
        <Pdf
          source={{uri: filepath.path}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
});
