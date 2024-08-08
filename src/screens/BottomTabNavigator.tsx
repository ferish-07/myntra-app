import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import {Fonts} from '../utils/assets/fonts';
import CustomBottomBar from './CustomBottomBar';
import Demo from './Demo';
// import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {CurvedBottomBar} from './CurvedBottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({navigation}: any) {
  const [isCurved, setIsCurved] = useState(true);

  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';
    let filledIcon = '';

    switch (routeName) {
      case 'Home':
        icon = 'home';
        filledIcon = 'home-filled';
        break;
      case 'Profile':
        icon = 'profile';
        filledIcon = 'profile-filled';
        break;
    }

    return (
      <Text
        style={{
          fontFamily: Fonts.myntra,
          color: routeName === selectedTab ? 'black' : 'gray',
          fontSize: 18,
        }}>
        {routeName === selectedTab ? filledIcon : icon}
      </Text>
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CurvedBottomBar.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="home"
        borderTopLeftRight
        isCurved={isCurved}
        screenOptions={{unmountOnBlur: true, headerShown: false}}
        renderCircle={({selectedTab, navigate}) => (
          <>
            {!isCurved ? null : (
              <Animated.View style={styles.btnCircleUp}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigate('AddCategory');
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.myntra,
                      fontSize: 18,
                      color: 'black',
                    }}>
                    {'menu'}
                  </Text>
                  {/* <Ionicons name={'apps-sharp'} color="gray" size={25} /> */}
                </TouchableOpacity>
              </Animated.View>
            )}
          </>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          name="Home"
          position="LEFT"
          component={() => <Home />}
        />
        <CurvedBottomBar.Screen
          name="Profile"
          component={() => <Profile navigation={navigation} />}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </>
  );
}
//  <Tab.Navigator
//     screenOptions={{
//       unmountOnBlur: true,
//       headerShown: false,
//     }}
//     tabBar={props => <CustomBottomBar {...props} />}>
//     <Tab.Screen name="Home" component={Home} />
//     <Tab.Screen name="Profile" component={Profile} />
//     <Tab.Screen name="add" component={Demo} />
//     <Tab.Screen name="Profile2" component={Profile} />
//     <Tab.Screen name="Profile3" component={Profile} />
//     {/* <Tab.Screen name="Demo" component={Demo} /> */}
//   </Tab.Navigator>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
