import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  LayoutChangeEvent,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  // SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Header from '../Common/Header';
import moment from 'moment';
import {CalculateDiscount} from '../../utils/common/Common';
import {TopShadowView} from '../Common/TopViewShadow';
// import {ScrollView} from 'react-native-gesture-handler';

export default function ProductDetails({route, navigation}: any) {
  const insets = useSafeAreaInsets();
  // console.log('--in', useSafeAreaInsets().top);

  const {product} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bottomViewVisible, setBottomViewVisible] = useState(true);
  const [sizeList, setSizeList] = useState([]);
  const _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPos = event.nativeEvent.contentOffset.x;
    const current = Math.floor(xPos / totalWidth);
    setCurrentIndex(current);
  };
  useEffect(() => {
    product.available_size.map((i: any) => {
      i.isSelected = false;
    });
    setSizeList(product.available_size);
  }, []);
  const _renderImage = ({item, index}: any) => {
    return (
      <View
        style={
          {
            //   backgroundColor: 'red',
            //   height: Dimensions.get('window').height / 1.5,
          }
        }>
        <Image
          source={{
            // https://drive.google.com/file/d/1rzKAV5sXLYWcVBWBGDpwCyEUBWtb1PF0/view?pli=1
            uri: `https://drive.google.com/uc?export=view&id=${item}`,
          }}
          style={{
            height: Dimensions.get('window').height / 1.5,
            width: Dimensions.get('window').width,
            borderRadius: 30,
          }}
        />
      </View>
    );
  };

  const _renderSize = ({item, indx}: any) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 20,
          borderWidth: 1,
          //   paddingVertical: 15,
          margin: 2,
          //   paddingHorizontal: 15,
          borderColor: item.isSelected ? '#282c3e' : '#d4d5d7',
          width: item.size.length == 1 ? 55 : 60,
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          backgroundColor: item.isSelected ? '#282c3e' : 'white',
        }}
        onPress={() => {
          let new_data = [...sizeList];
          new_data.map((i: any) => {
            if (item.size == i.size) {
              i.isSelected = true;
            } else {
              i.isSelected = false;
            }
          });
          setSizeList(new_data);
          // console.log('----->>>', item);
        }}>
        <Text
          style={{
            color: item.isSelected ? 'white' : '#282c3e',
            fontWeight: '800',
          }}>
          {item.size.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Header title={product.company_name} navigation={navigation} />
      <ScrollView
        style={{marginTop: 10, flex: 1}}
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          console.log(
            'eventtt-->>',
            event.nativeEvent.contentOffset.y,
            global.ViewHeight,
            Dimensions.get('window').height,
            insets.top + insets.bottom,
          );
          if (Platform.OS == 'android') {
            if (
              event.nativeEvent.contentOffset.y >=
              global.ViewHeight - (Dimensions.get('window').height - 55)
            ) {
              setBottomViewVisible(false);
            }
            if (
              event.nativeEvent.contentOffset.y <=
              global.ViewHeight - (Dimensions.get('window').height - 55)
            ) {
              setBottomViewVisible(true);
            }
          } else {
            if (
              event.nativeEvent.contentOffset.y -
                (insets.top + insets.bottom) >=
              global.ViewHeight
            ) {
              setBottomViewVisible(false);
            }
            if (
              event.nativeEvent.contentOffset.y -
                (insets.top + insets.bottom) -
                45 <=
              global.ViewHeight
            ) {
              setBottomViewVisible(true);
            }
          }
        }}>
        <View
          onLayout={(event: LayoutChangeEvent) => {
            // console.log(
            //   '-------->',
            //   event.nativeEvent.layout.height,
            //   Dimensions.get('window').height,
            //   insets.bottom,
            //   insets.top,
            //   insets,
            //   '---',
            //   event.nativeEvent.layout.height -
            //     (Dimensions.get('window').height - 40),
            // );
            global.ViewHeight =
              Platform.OS == 'android'
                ? event.nativeEvent.layout.height
                : event.nativeEvent.layout.height -
                  Dimensions.get('window').height;
          }}>
          <FlatList
            data={product.images}
            renderItem={_renderImage}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={_onScroll}
          />
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              justifyContent: 'center',
            }}>
            {product.images.map((_: any, index: any) => {
              return (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: currentIndex == index ? '#282c3e' : 'gray',
                    borderRadius: 100,
                    margin: 2,
                  }}
                />
              );
            })}
          </View>
          <View style={{marginHorizontal: 18}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#282c3e',
                  }}>
                  {product.company_name}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 14, color: '#282c3e'}}>
                  {' ' + product.product_name}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                //   alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#686b79',
                }}>
                {'MRP  '}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#686b79',
                  textDecorationLine: 'line-through',
                }}>
                {`₹${product.price}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#282c3e',
                  fontWeight: 'bold',
                  marginLeft: 8,
                  // textDecorationLine: 'line-through',
                }}>
                {`₹${CalculateDiscount(
                  product.price,
                  product.discounted_percent,
                )}`}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#e85223',
                  fontWeight: 'bold',
                  marginLeft: 8,
                  // textDecorationLine: 'line-through',
                }}>
                {`${product.discounted_percent}% OFF!`}
              </Text>
            </View>
            <View
              style={{
                marginTop: 40,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // marginTop: 5,
                }}>
                <Text
                  style={{
                    color: '#262a39',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Select Size
                </Text>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() =>
                    navigation.navigate('SizeChart', {productDetail: product})
                  }>
                  <Text
                    style={{
                      color: '#ff3e6b',
                      fontWeight: '600',
                      fontSize: 14,
                    }}>
                    Size Chart
                  </Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    color="#ff3e6b"
                  />
                </TouchableOpacity>
              </View>
              <FlatList data={sizeList} renderItem={_renderSize} horizontal />
            </View>
            <View
              style={{
                marginTop: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#d4d5d7',
                  width: '49%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 8,
                  alignItems: 'center',
                }}>
                <Ionicons name="heart-outline" size={20} color="#262a39" />
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 18,
                    color: '#262a39',
                    marginLeft: 5,
                  }}>
                  Wishlist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ff3e6b',
                  width: '49%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 8,
                  alignItems: 'center',
                  backgroundColor: '#ff3e6b',
                }}>
                <Ionicons name="bag-handle-outline" size={20} color="white" />
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 18,
                    color: 'white',
                    marginLeft: 5,
                  }}>
                  Add to Bag
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 18}}>
          <View
            style={{
              marginTop: 30,
            }}>
            <Text style={{color: '#262a39', fontWeight: 'bold', fontSize: 18}}>
              Delivery & Services
            </Text>
            <View
              style={{
                borderColor: '#d4d5d7',
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>395017</Text>
              <TouchableOpacity style={{padding: 5}}>
                <Text
                  style={{fontSize: 16, fontWeight: '800', color: '#ff3e6b'}}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: '800', color: '#262a39'}}>
                  Get it by{' '}
                  {moment(new Date()).add(4, 'days').format('ddd, DD MMM')}
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: 'gray'}}>
                    {'\nNo Convenience Fee '}
                    <Text style={{textDecorationLine: 'line-through'}}>
                      ₹149
                    </Text>
                  </Text>
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: '800', color: '#262a39'}}>
                  Pay on Delivery is available
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: 'gray'}}>
                    {'\n₹10 additional fee applicable'}
                  </Text>
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: '800', color: '#262a39'}}>
                  Hassle free 14 days Return & Exchange
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {bottomViewVisible ? (
        <TopShadowView
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#d4d5d7',
                width: '49%',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 8,
                alignItems: 'center',
              }}>
              <Ionicons name="heart-outline" size={20} color="#262a39" />
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 18,
                  color: '#262a39',
                  marginLeft: 5,
                }}>
                Wishlist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ff3e6b',
                width: '49%',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 8,
                alignItems: 'center',
                backgroundColor: '#ff3e6b',
              }}>
              <Ionicons name="bag-handle-outline" size={20} color="white" />
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 18,
                  color: 'white',
                  marginLeft: 5,
                }}>
                Add to Bag
              </Text>
            </TouchableOpacity>
          </View>
        </TopShadowView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
