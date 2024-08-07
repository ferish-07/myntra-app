import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
const width = Dimensions.get('window').width;
export const IMAGE_LIST_DASHBOARD_COUROSOL = [
  'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/5/22/2d6ba180-0fe1-4754-9557-56320a6899dc1716399602300-DESKTOP-HP-BANNER-----8.jpg',
  'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/b656a7f4-4688-4997-bb7c-54b78793981e1658752386588-Western-Wear_Desk.jpg',
  'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/179e278f-77ee-44c2-bf39-9f00b0cd08e01658752429301-Handbags_Desk.jpg',
  'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg',
  'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg',
  'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/27/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk.jpg',
];

export default function SlidingComponent() {
  const [currentActiveIndex, setCurrentActiveIndex] = useState<any>(0);
  const Pagination = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
        }}>
        {IMAGE_LIST_DASHBOARD_COUROSOL.map((item, index) => {
          return (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 100,
                backgroundColor: currentActiveIndex == index ? 'red' : 'grey',
                margin: 5,
              }}
            />
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView>
      <Carousel
        loop
        width={Dimensions.get('window').width}
        height={160}
        // height={width / 2}
        autoPlay={true}
        data={IMAGE_LIST_DASHBOARD_COUROSOL}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
        }}
        scrollAnimationDuration={1000}
        onSnapToItem={index => {
          setCurrentActiveIndex(index);
        }}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              // justifyContent: 'center',
            }}>
            <Image
              source={{uri: item}}
              style={{flex: 1}}
              resizeMode="contain"
            />
          </View>
        )}
      />

      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          top: 140,
        }}>
        <Pagination />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
