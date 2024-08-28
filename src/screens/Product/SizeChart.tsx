import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Common/Header';
import {CalculateDiscount} from '../../utils/common/Common';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SizeChart({route, navigation}: any) {
  const {productDetail} = route.params;
  const [isCm, setIsCm] = useState<boolean>(false);
  const [header, setHeader] = useState([
    {lable: null},
    {lable: 'Size', key: 'size'},
    {lable: 'Chest', key: 'chest'},
    {lable: 'Front Length', key: 'FL'},
    {lable: 'Waist', key: 'waist'},
    {lable: 'Across Shoulder', key: 'AS'},
  ]);
  const [sizeChart, setSizeChart] = useState([
    {
      size: 'S',
      chest: 38.0,
      FL: 26.5,
      AS: 16.0,
      waist: 38.0,
    },
    {
      size: 'M',
      chest: 40.0,
      FL: 27.0,
      AS: 17.0,
      waist: 40.0,
    },
  ]);
  useEffect(() => {
    if (isCm) {
      setSizeChart([
        {
          size: 'S',
          chest: 96.5,
          FL: 67.3,
          AS: 40.6,
          waist: 96.5,
        },
        {
          size: 'M',
          chest: 101.6,
          FL: 68.6,
          AS: 43.2,
          waist: 101.6,
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
        },
        {
          size: 'M',
          chest: 40.0,
          FL: 27.0,
          AS: 17.0,
          waist: 40.0,
        },
      ]);
    }
  }, [isCm]);
  const ProductCard = ({item}: any) => {
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
          flex: 1,
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
  };
  return (
    <View>
      <Header title="Size Chart" navigation={navigation} />
      <ScrollView contentContainerStyle={{backgroundColor: '#f4f4f5'}}>
        <ProductCard item={productDetail} />
        <View style={{backgroundColor: '#f4f4f5'}}>
          <View style={{flexDirection: 'row', marginHorizontal: 15}}>
            <TouchableOpacity
              style={{
                width: '50%',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderBottomColor: '#ff3e6b',
                borderBottomWidth: 2,
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
                borderBottomColor: '#ff3e6b',
                borderBottomWidth: 2,
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, color: '#282c3e'}}>
                How to measure
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: 'white', justifyContent: 'center'}}>
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
                      console.log('-----', i);
                      return (
                        <View
                          style={{
                            width: i.lable == null ? '15%' : `${width}%`,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: 'red',
                            // borderRightWidth: 1,
                          }}>
                          {i.lable == null ? (
                            <Ionicons
                              name="radio-button-off-outline"
                              size={22}
                            />
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
