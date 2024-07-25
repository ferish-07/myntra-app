import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts} from '../utils/assets/fonts';

const {width} = Dimensions.get('window');
type CustomBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};
export default function CustomBottomBar({
  state,
  descriptors,
  navigation,
}: CustomBarProps) {
  console.log(
    '----Statetttetetetetetetete',
    typeof state,
    '---',
    typeof descriptors,
    '------>',
    typeof navigation,
  );
  interface Screen {
    label: string;
    key?: string;
    icon: string;
    isFocused: Boolean;
    fontFamilyFile: string;
    navigate: string;
  }
  const tabMenuData: Screen[] = [
    {
      label: 'Home',
      icon: 'home',
      isFocused: true,
      fontFamilyFile: Fonts.myntra,
      navigate: 'home',
    },
    {
      label: 'add',
      icon: 'add',
      isFocused: false,
      fontFamilyFile: Fonts.myntra,
      navigate: 'add',
    },
    {
      label: 'Profile',
      icon: 'profile',
      isFocused: false,
      fontFamilyFile: Fonts.myntra,
      navigate: 'profile',
    },
  ];
  const [dataSource, setDataSource] = useState<Screen[]>([]);
  useEffect(() => {
    tabMenuData.map(screen => {
      state.routes.map((screen2: any) => {
        if (screen.label == screen2.name) {
          console.log('-----------');
          screen.key = screen2.key;
        }
      });
    });
    setDataSource(tabMenuData);
    console.log('---newData', tabMenuData);
  }, []);
  const onPress = (route: any) => {
    let newData = dataSource;
    newData.map((i: any) => {
      if (i.key == route.key) {
        i.isFocused = true;
      } else {
        i.isFocused = false;
      }
    });
    setDataSource(newData);
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.label);
    }
  };
  return (
    <View style={styles.mainContainer}>
      {dataSource.map((route: any, index: number) => {
        return (
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              // {borderRightWidth: label == 'notes' ? 3 : 0},
            ]}>
            {index == 1 ? (
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  backgroundColor: 'white',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // left: Dimensions.get('screen').width / 2.2,
                  bottom: 20,
                  elevation: 2,
                  // height: 200,
                  borderWidth: Platform.OS == 'android' ? 0.5 : 0.2,
                  borderColor: '#7D7D7D',
                  shadowRadius: 2,
                  shadowOpacity: 0.1,

                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowColor: '#000',
                }}
                onPress={() => navigation.navigate('AddCategory')}>
                <Text style={{fontFamily: Fonts.myntra}}>{'add-solid'}</Text>
              </TouchableOpacity>
            ) : (
              <Pressable
                onPress={() => {
                  if (!route.isFocused) {
                    onPress(route);
                  }
                }}
                style={{
                  // backgroundColor: isFocused ? '#030D16' : '#182028',
                  // borderRadius: 100,
                  width: 30,
                  height: 30,
                  // padding: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    // padding: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.myntra,
                      color: route.isFocused ? 'red' : 'black',
                    }}>
                    {route.label.toLowerCase()}
                  </Text>
                  {/* <NavigationIcon route={label} isFocused={isFocused} /> */}
                </View>
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    // borderTopRightRadius: 25,
    // borderTopLeftRadius: 25,
    // marginHorizontal: 16,
    elevation: 5,
    borderTopWidth: Platform.OS == 'android' ? 0.5 : 0.2,
    borderColor: '#7D7D7D',
    // marginHorizontal: width,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
  progressLayer: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'rgba(0,0,0,0.01)',
    borderBottomColor: 'rgba(0,0,0,0.01)',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{rotateZ: '-45deg'}],
  },
  offsetLayer: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 100,
    borderLeftColor: 'rgba(0,0,0,0.01)',
    borderBottomColor: 'rgba(0,0,0,0.01)',
    borderRightColor: 'white',
    borderTopColor: 'white',
    transform: [{rotateZ: '-135deg'}],
  },
});
