import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {Fonts} from '../../utils/assets/fonts';
import FloatingTextInput from './FloatingTextInput';

interface LoginModalProps {
  modalIsVisible: boolean;
  onClose: () => void;
}
export default function LoginModal(props: LoginModalProps) {
  const {modalIsVisible = false, onClose} = props;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const scaleValueFacebook = useRef(new Animated.Value(1)).current;
  const scaleValueLogin = useRef(new Animated.Value(1)).current;
  const scaleValueRegis = useRef(new Animated.Value(1)).current;

  const onPressIn = (item: any) => {
    Animated.spring(item, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = (item: any) => {
    Animated.spring(item, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const RegistrationComponent = () => {
    return (
      <>
        <FloatingTextInput label="Full Name" />
        <FloatingTextInput label="Email/Mobile Number" />
        <FloatingTextInput label="Password" secureTextEntry={true} />
        <FloatingTextInput label="Confirm Password" secureTextEntry={true} />
        <Pressable
          onPressIn={() => onPressIn(scaleValueRegis)}
          onPressOut={() => onPressOut(scaleValueRegis)}>
          <Animated.View
            style={[
              styles.buttonContent,
              styles.button,
              {transform: [{scale: scaleValueRegis}]},
            ]}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Animated.View>
        </Pressable>
      </>
    );
  };
  const onLoginPress = (loginCred: any) => {
    console.log('------->>>', loginCred);
    let reg = /^\d+$/;
    console.log(reg.test(loginCred.cred));
    const payload = {
      [reg.test(loginCred.cred) ? 'contact_number' : 'email']: loginCred.cred,
      password: loginCred.password,
    };
    console.log('--payload', payload);
  };

  const LoginComponent = () => {
    const [loginCred, setLoginCred] = useState<object>({});
    return (
      <>
        <FloatingTextInput
          label="Email/Mobile Number"
          onChangeText={data => {
            let newObj = {...loginCred, ['cred']: data};
            console.log('-----', newObj);
            setLoginCred(newObj);
          }}
        />
        <FloatingTextInput
          label="Password"
          secureTextEntry={true}
          onChangeText={data => {
            let newObj = {...loginCred, ['password']: data};
            console.log('---ee--', newObj);
            setLoginCred(newObj);
          }}
        />
        <Pressable
          onPressIn={() => onPressIn(scaleValueLogin)}
          onPressOut={() => onPressOut(scaleValueLogin)}
          onPress={() => {
            onLoginPress(loginCred);
          }}>
          <Animated.View
            style={[
              styles.buttonContent,
              styles.button,
              {transform: [{scale: scaleValueLogin}]},
            ]}>
            <Text style={styles.buttonText}>Login...</Text>
          </Animated.View>
        </Pressable>
      </>
    );
  };
  const SocialMediaLogin = () => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            borderColor: 'gray',
            marginTop: 10,
            transform: [{scale: scaleValue}],
          }}
          onPressIn={() => onPressIn(scaleValue)}
          onPressOut={() => onPressOut(scaleValue)}>
          <Image
            source={{
              uri: 'https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/544/Google__G__Logo-512.png',
            }}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 16}}>
              {isRegister ? 'Sign in using Google' : 'Log in using Google'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            borderColor: 'gray',
            marginTop: 10,
            transform: [{scale: scaleValueFacebook}],
          }}
          onPressIn={() => onPressIn(scaleValueFacebook)}
          onPressOut={() => onPressOut(scaleValueFacebook)}>
          <Image
            source={{
              uri: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png',
            }}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 16}}>
              {isRegister ? 'Sign in using Facebook' : 'Log in using Facebook'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const toggleVisibility = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsRegister(!isRegister);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };
  return (
    <Modal
      isVisible={modalIsVisible}
      style={{margin: 0, justifyContent: 'flex-end'}}
      avoidKeyboard={true}
      swipeDirection="down"
      onSwipeComplete={() => {
        Vibration.vibrate(100);

        onClose();
      }}
      onBackdropPress={() => onClose()}>
      <View
        style={{
          backgroundColor: 'white',
          height: '70%',
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
          <Animated.View style={{opacity: fadeAnim}}>
            {isRegister ? <RegistrationComponent /> : <LoginComponent />}
          </Animated.View>
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'lightgrey', fontWeight: '700'}}>
              or login using Social Platform
            </Text>
          </View>
          <SocialMediaLogin />
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{fontSize: 16, color: 'lightgrey', fontWeight: '700'}}>
              {isRegister
                ? 'Already have an account?'
                : `Does't have an account?`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                toggleVisibility();
              }}>
              <Text style={{fontSize: 16, color: '#ff3f6c', fontWeight: '700'}}>
                {isRegister ? 'Login' : ` Register`}
              </Text>
            </TouchableOpacity>
          </View>
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
  button: {
    backgroundColor: '#ff3f6c',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
