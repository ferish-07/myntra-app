import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Fonts} from '../utils/assets/fonts';
const {width} = Dimensions.get('window');
export default function CustomBottomBar({state, descriptors, navigation}: any) {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        console.log('-----label', label);
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              {borderRightWidth: label == 'notes' ? 3 : 0},
            ]}>
            {index == 1 ? (
              <TouchableOpacity
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
                }}>
                <Text>F</Text>
              </TouchableOpacity>
            ) : (
              <Pressable
                onPress={onPress}
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
                      color: isFocused ? 'red' : 'black',
                    }}>
                    {label.toLowerCase()}
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
