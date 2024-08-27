import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Common/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Products({route, navigation}: any) {
  const {title} = route.params;
  const [items, setItems] = useState<any>([
    {
      id: 1,
      company_name: 'HERE&NOW',
      product_name: 'Men Printed T-Shirt',
      price: '799',
      discounted_percent: '53',
      images: [
        '1VdAs4yRi85TrOHLC2xIzaBt0GFIRUHOq',
        '19t6AXtRV0Q9mhAWyogtgTIa0l25yIMRQ',
        '1sCsfpJNPdQO63bDZyFJawT6OYSVAs2Os',
        '1XGzYxnB24Q2JA661WXmnwG0M6986KYzn',
        '1cbhE3mHlnbRiyp5tDOe25-PxRjlRANHU',
      ],
      available_size: [
        {size: 'S', isAvailable: true},
        {size: 'M', isAvailable: true},
        {size: 'L', isAvailable: true},
        {size: 'xL', isAvailable: true},
        {size: 'xxL', isAvailable: true},
      ],
    },
    {
      id: 2,
      company_name: 'HRX by Hrithik Roshan',
      product_name: 'Rapid Dry Training T-shirt',
      price: '599',
      discounted_percent: '43',
      images: [
        '1VdAs4yRi85TrOHLC2xIzaBt0GFIRUHOq',
        '19t6AXtRV0Q9mhAWyogtgTIa0l25yIMRQ',
        '1sCsfpJNPdQO63bDZyFJawT6OYSVAs2Os',
        '1XGzYxnB24Q2JA661WXmnwG0M6986KYzn',
        '1cbhE3mHlnbRiyp5tDOe25-PxRjlRANHU',
      ],
      available_size: [
        {size: 'S', isAvailable: true},
        {size: 'M', isAvailable: false},
        {size: 'L', isAvailable: true},
        {size: 'xL', isAvailable: false},
        {size: 'xxL', isAvailable: true},
      ],
    },
    {
      id: 2,
      company_name: 'HRX by Hrithik Roshan',
      product_name: 'Rapid Dry Training T-shirt',
      price: '599',
      discounted_percent: '43',
      images: [
        '1VdAs4yRi85TrOHLC2xIzaBt0GFIRUHOq',
        '19t6AXtRV0Q9mhAWyogtgTIa0l25yIMRQ',
        '1sCsfpJNPdQO63bDZyFJawT6OYSVAs2Os',
        '1XGzYxnB24Q2JA661WXmnwG0M6986KYzn',
        '1cbhE3mHlnbRiyp5tDOe25-PxRjlRANHU',
      ],
      available_size: [
        {size: 'S', isAvailable: false},
        {size: 'M', isAvailable: true},
        {size: 'L', isAvailable: true},
        {size: 'xL', isAvailable: false},
        {size: 'xxL', isAvailable: true},
      ],
    },
    {
      id: 2,
      company_name: 'HRX by Hrithik Roshan',
      product_name: 'Rapid Dry Training T-shirt',
      price: '599',
      discounted_percent: '43',
      images: [
        '1VdAs4yRi85TrOHLC2xIzaBt0GFIRUHOq',
        '19t6AXtRV0Q9mhAWyogtgTIa0l25yIMRQ',
        '1sCsfpJNPdQO63bDZyFJawT6OYSVAs2Os',
        '1XGzYxnB24Q2JA661WXmnwG0M6986KYzn',
        '1cbhE3mHlnbRiyp5tDOe25-PxRjlRANHU',
      ],
      available_size: [
        {size: 'S', isAvailable: true},
        {size: 'M', isAvailable: true},
        {size: 'L', isAvailable: true},
        {size: 'xL', isAvailable: true},
        {size: 'xxL', isAvailable: false},
      ],
    },
    {
      id: 2,
      company_name: 'HRX by Hrithik Roshan',
      product_name: 'Rapid Dry Training T-shirt',
      price: '599',
      discounted_percent: '43',
      images: [
        '1VdAs4yRi85TrOHLC2xIzaBt0GFIRUHOq',
        '19t6AXtRV0Q9mhAWyogtgTIa0l25yIMRQ',
        '1sCsfpJNPdQO63bDZyFJawT6OYSVAs2Os',
        '1XGzYxnB24Q2JA661WXmnwG0M6986KYzn',
        '1cbhE3mHlnbRiyp5tDOe25-PxRjlRANHU',
      ],
      available_size: [
        {size: 'S', isAvailable: true},
        {size: 'M', isAvailable: true},
        {size: 'L', isAvailable: true},
        {size: 'xL', isAvailable: true},
        {size: 'xxL', isAvailable: true},
      ],
    },
    {
      id: 2,
      company_name: 'HRX by Hrithik Roshan',
      product_name: 'Rapid Dry Training T-shirt',
      price: '599',
      discounted_percent: '43',
      images: [
        '1VdAs4yRi85TrOHLC2xIzaBt0GFIRUHOq',
        '19t6AXtRV0Q9mhAWyogtgTIa0l25yIMRQ',
        '1sCsfpJNPdQO63bDZyFJawT6OYSVAs2Os',
        '1XGzYxnB24Q2JA661WXmnwG0M6986KYzn',
        '1cbhE3mHlnbRiyp5tDOe25-PxRjlRANHU',
      ],
      available_size: [
        {size: 'S', isAvailable: true},
        {size: 'M', isAvailable: true},
        {size: 'L', isAvailable: false},
        {size: 'xL', isAvailable: true},
        {size: 'xxL', isAvailable: true},
      ],
    },
  ]);
  const calculateDiscount = (originalPrice: any, discount: any) => {
    let discount_price = originalPrice - originalPrice * (discount / 100);
    return discount_price.toFixed(0);
  };
  const _renderProductList = ({item, index}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          //   backgroundColor: 'red',
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Product_details', {product: item})}>
        <View style={{}}>
          <Image
            source={{
              // https://drive.google.com/file/d/1rzKAV5sXLYWcVBWBGDpwCyEUBWtb1PF0/view?pli=1
              uri: `https://drive.google.com/uc?export=view&id=${item.images[index]}`,
            }}
            style={{
              height: Dimensions.get('window').height / 2.5,
              width: Dimensions.get('window').width / 2.1,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              paddingHorizontal: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              //   alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#282c3e'}}>
              {item.company_name}
            </Text>
            <Ionicons name="heart-outline" size={20} color="#525665" />
          </View>
          <View
            style={{
              paddingHorizontal: 5,
            }}>
            <Text
              style={{fontSize: 12, color: '#686b79'}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.product_name}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 5,
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
              {`₹${calculateDiscount(item.price, item.discounted_percent)}`}
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
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Header title={title} navigation={navigation} />
      <FlatList
        data={items}
        style={{marginTop: 10}}
        renderItem={_renderProductList}
        numColumns={2}
      />
    </SafeAreaView>
  );
}
