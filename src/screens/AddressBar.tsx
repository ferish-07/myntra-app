import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
// import Geolocation from 'react-native-geolocation-service';
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
// import MapView, {Marker} from 'react-native-maps';
// import * as Location from 'expo-location';

export default function AddressBar() {
  const [selectedAddress, setSelectedAddress] = useState(
    'C-B1, Green Victory Appartment, Opposite Indian Oil petrol Pump , Althan, Surat - 3965017',
  );
  const [deliverTo, setDeliverTo] = useState('Ferish Modi');
  const [openLocationModal, setOpenLocationModal] = useState(false);
  useEffect(() => {
    requestLocationPermission();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     let {status} = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       // setErrorMsg('Permission to access location is not granted');
  //       console.log('----Permission not granted');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     // setLocation(location);c
  //     console.log('-----------location', location);
  //   })();
  // }, []);
  const onClose = () => {
    setOpenLocationModal(false);
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          //   backgroundColor: 'red',
          width: '75%',
          margin: 8,
        }}
        onPress={() => setOpenLocationModal(!openLocationModal)}>
        <Icon name="location" size={24} />
        <Text style={{fontSize: 16}}> Deliver to </Text>
        <Text style={{fontWeight: '900'}}>{deliverTo} - </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{fontWeight: '900', width: '40%'}}>
          {selectedAddress}
        </Text>
        <View style={{}}>
          <Icon name="chevron-down-outline" size={20} />
        </View>
      </TouchableOpacity>
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
      <Modal
        isVisible={openLocationModal}
        style={{margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard={true}
        swipeDirection="down"
        animationIn={'bounceInUp'}
        onSwipeComplete={() => {
          Vibration.vibrate(100);

          onClose();
        }}
        onBackdropPress={() => onClose()}>
        <View
          style={{
            backgroundColor: 'white',
            height: '50%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}></View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
