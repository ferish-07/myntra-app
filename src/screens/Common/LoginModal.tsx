import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Fonts} from '../../utils/assets/fonts';
import FloatingTextInput from './FloatingTextInput';
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
        <View style={styles.headerContainer}>
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
        <ScrollView style={{flex: 1, padding: 15}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <FloatingTextInput
              label="First Name"
              mainViewStyle={{width: '50%'}}
            />
            <FloatingTextInput
              label="Last Name"
              mainViewStyle={{width: '48%'}}
            />
          </View>
          <FloatingTextInput
            label="Email"
            // mainViewStyle={{width: '45%', margin: 2}}
          />
          <FloatingTextInput
            label="Contact Number"
            keyboardType="number-pad"
            // mainViewStyle={{width: '45%', margin: 2}}
          />
          <FloatingTextInput
            label="Password"
            // keyboardType="number-pad"
            secureTextEntry={true}
            // mainViewStyle={{width: '45%', margin: 2}}
          />
          <FloatingTextInput
            label="Confirm Password"
            // keyboardType="number-pad"
            secureTextEntry={true}
            // mainViewStyle={{width: '45%', margin: 2}}
          />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
});
