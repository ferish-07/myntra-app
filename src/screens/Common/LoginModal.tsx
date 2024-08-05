import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Fonts} from '../../utils/assets/fonts';
interface LoginModalProps {
  modalIsVisible: boolean;
  onClose: () => void;
}
export default function LoginModal(props: LoginModalProps) {
  const {modalIsVisible = false, onClose} = props;
  return (
    <Modal
      isVisible={modalIsVisible}
      style={{margin: 0, justifyContent: 'flex-end'}}
      avoidKeyboard={true}
      onBackdropPress={() => onClose()}>
      <View
        style={{
          backgroundColor: 'white',
          height: '80%',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 0.5,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 10,
              padding: 5,
            }}
            onPress={() => onClose()}>
            <Text style={{fontFamily: Fonts.myntra}}>{'close'}</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 18}}>Log in or sign up</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
