import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import Header from '../Common/Header';
import {CalculateDiscount} from '../../utils/common/Common';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ProductCard = memo(({item}: any) => {
  console.log('----RE RENDER');
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 5,
        borderBottomLeftRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        borderBottomRightRadius: 10,
        // flex: 1,
      }}>
      <View style={{flex: 0.3}}>
        <Image
          source={{
            uri: `https://drive.google.com/uc?export=view&id=${item.images[0]}`,
          }}
          style={{width: 70, height: 100, borderRadius: 10}}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#282c3e'}}>
          {item.company_name}
        </Text>
        <Text style={{fontSize: 14, color: '#686b79'}}>
          {item.product_name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 13,
              color: '#686b79',
              textDecorationLine: 'line-through',
            }}>
            {`₹${item.price}`}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#282c3e',
              fontWeight: 'bold',
              marginLeft: 8,
              // textDecorationLine: 'line-through',
            }}>
            {`₹${CalculateDiscount(item.price, item.discounted_percent)}`}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#e85223',
              fontWeight: 'bold',
              marginLeft: 8,
              // textDecorationLine: 'line-through',
            }}>
            {`${item.discounted_percent}% OFF!`}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={{color: 'black', fontSize: 14}}>
            Delivery by{' '}
            {moment(new Date()).add(4, 'days').format('ddd, DD MMM')}
          </Text>
        </View>
      </View>
    </View>
  );
});
export default function SizeChart({route, navigation}: any) {
  const {productDetail} = route.params;
  const [isCm, setIsCm] = useState<boolean>(false);
  const [isMeasureView, setIsMeasureView] = useState<boolean>(false);
  const [header, setHeader] = useState([
    {lable: null},
    {lable: 'Size', key: 'size'},
    {lable: 'Chest', key: 'chest'},
    {lable: 'Front Length', key: 'FL'},
    {lable: 'Waist', key: 'waist'},
    {lable: 'Across Shoulder', key: 'AS'},
  ]);
  interface SizeChartProps {
    size: string;
    chest: number;
    FL: number;
    AS: number;
    waist: number;
    isSelected: boolean;
  }
  const [sizeChart, setSizeChart] = useState<SizeChartProps[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    if (isCm) {
      setSizeChart([
        {
          size: 'S',
          chest: 96.5,
          FL: 67.3,
          AS: 40.6,
          waist: 96.5,
          isSelected: false,
        },
        {
          size: 'M',
          chest: 101.6,
          FL: 68.6,
          AS: 43.2,
          waist: 101.6,
          isSelected: false,
        },
        {
          size: 'L',
          chest: 106.7,
          FL: 71.1,
          AS: 45.7,
          waist: 106.7,
          isSelected: false,
        },
        {
          size: 'XL',
          chest: 111.8,
          FL: 73.7,
          waist: 111.8,
          AS: 48.3,
          isSelected: false,
        },
      ]);
    } else {
      setSizeChart([
        {
          size: 'S',
          chest: 38.0,
          FL: 26.5,
          AS: 16.0,
          waist: 38.0,
          isSelected: false,
        },
        {
          size: 'M',
          chest: 40.0,
          FL: 27.0,
          AS: 17.0,
          waist: 40.0,
          isSelected: false,
        },
        {
          size: 'L',
          chest: 42.0,
          FL: 28.0,
          AS: 18.0,
          waist: 42.0,
          isSelected: false,
        },
        {
          size: 'XL',
          chest: 44.0,
          FL: 29.0,
          AS: 19.0,
          waist: 44.0,
          isSelected: false,
        },
      ]);
    }
  }, [isCm]);
  const productDetailMemo = useMemo(() => productDetail, [productDetail]);
  const changeSizeRadio = (selectedItem: any) => {
    console.log('----SELECTED ITEM', selectedItem);
    let new_size = [...sizeChart];
    new_size.map(i => {
      if (i.size == selectedItem.size) {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    setSizeChart(new_size);
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Size Chart" navigation={navigation} />
      <View style={{flex: 1}}>
        <ScrollView
          scrollEnabled={false}
          nestedScrollEnabled={true}
          contentContainerStyle={{backgroundColor: '#f4f4f5'}}>
          <View style={{height: 121}}>
            <ProductCard item={productDetailMemo} />
          </View>
          <View style={{backgroundColor: '#f4f4f5'}}>
            <View style={{flexDirection: 'row', marginHorizontal: 15}}>
              <TouchableOpacity
                style={{
                  width: '50%',
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  borderBottomColor: !isMeasureView ? '#ff3e6b' : '#f4f4f5',
                  borderBottomWidth: 2,
                }}
                onPress={() => {
                  setIsMeasureView(false);
                  scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
                  });
                }}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, color: '#282c3e'}}>
                  Size Chart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '50%',
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  borderBottomColor: isMeasureView ? '#ff3e6b' : '#f4f4f5',
                  borderBottomWidth: 2,
                }}
                onPress={() => {
                  setIsMeasureView(true);
                  scrollRef.current?.scrollToEnd({
                    animated: true,
                  });
                }}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, color: '#282c3e'}}>
                  How to measure
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollRef}
              scrollEnabled={true}
              style={{
                backgroundColor: 'white',

                maxHeight: '79%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#f4f4f5',
                }}>
                <Text style={{fontSize: 16, color: '#686b79'}}>
                  Select size in
                </Text>
                <View
                  style={{
                    backgroundColor: '#f4f4f5',
                    flexDirection: 'row',
                    borderRadius: 15,
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: 5,
                      paddingHorizontal: 15,
                      backgroundColor: isCm ? '#f4f4f5' : '#282c3e',
                      borderRadius: 15,
                    }}
                    onPress={() => setIsCm(false)}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: isCm ? '#686b79' : 'white',
                      }}>
                      in
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: 5,
                      paddingHorizontal: 15,
                      backgroundColor: isCm ? '#282c3e' : '#f4f4f5',
                      borderRadius: 15,
                    }}
                    onPress={() => setIsCm(true)}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: !isCm ? '#686b79' : 'white',
                      }}>
                      cm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <FlatList
                scrollEnabled={false}
                data={sizeChart}
                ListHeaderComponent={() => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderColor: '#f4f4f5',
                        paddingVertical: 10,
                      }}>
                      {header.map((i, index) => {
                        let width = 85 / (header.length - 1);
                        return (
                          <View
                            style={{
                              width: index == 0 ? '15%' : `${width}%`,
                              justifyContent: 'center',
                              alignItems: 'center',
                              // backgroundColor: 'red',
                              // borderRightWidth: 1,
                            }}>
                            <Text style={{textAlign: 'center'}}>
                              {i.lable}
                              {i.lable && i.lable != 'Size'
                                ? isCm
                                  ? ' (cm)'
                                  : ' (in)'
                                : null}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                }}
                //   extraData={isCm}
                renderItem={({item, index}: any) => {
                  let width = 85 / (header.length - 1);
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderColor: '#f4f4f5',
                        paddingVertical: 10,
                      }}>
                      {header.map(i => {
                        return (
                          <View
                            style={{
                              width: i.lable == null ? '15%' : `${width}%`,
                              justifyContent: 'center',
                              alignItems: 'center',

                              // borderRightWidth: 1,
                            }}>
                            {i.lable == null ? (
                              <TouchableOpacity
                                onPress={() => changeSizeRadio(item)}>
                                {item.isSelected ? (
                                  <Ionicons
                                    name="radio-button-on-outline"
                                    size={22}
                                  />
                                ) : (
                                  <Ionicons
                                    name="radio-button-off-outline"
                                    size={22}
                                  />
                                )}
                              </TouchableOpacity>
                            ) : (
                              <Text style={{textAlign: 'center', fontSize: 16}}>
                                {item[i.key]}
                              </Text>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  );
                }}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  paddingHorizontal: 25,
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#282c3e'}}>
                  How to Measure
                </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25,
                  }}>
                  <Image
                    source={{
                      uri: 'https://assets.myntassets.com/assets/images/sizechart/2016/12/14/11481690842463-Tshirts_men.png',
                    }}
                    style={{
                      width: Dimensions.get('window').width - 50,
                      height: Dimensions.get('window').width - 10,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <View style={{backgroundColor: 'white', padding: 10}}>
        <View
          style={{
            // marginTop: 40,
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
              // borderColor: '#ff3e6b',
              borderColor: '#d4d5d7',
              width: '49%',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
              alignItems: 'center',
              // backgroundColor: '#ff3e6b',
              backgroundColor: '#d4d5d7',
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
  );
}

const styles = StyleSheet.create({});
