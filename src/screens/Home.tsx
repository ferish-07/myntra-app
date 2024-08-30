import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SlidingComponent from './Common/SlidingComponent';
import Header from './Common/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({navigation}: any) {
  const [mainCategory, setMainCategory] = useState<any[]>([
    {
      title: 'Fashion',
      id: 1,
      isSelected: true,
      subCategory: [
        {
          title: 'Men',
          id: 1,
        },
        {
          title: 'Women',
          id: 2,
        },
        {
          title: 'Kids',
          id: 3,
        },
        {
          title: 'Footwear',
          id: 4,
        },
      ],
    },
    {
      title: 'Beauty',
      id: 2,
      isSelected: false,
      subCategory: [
        {
          title: 'Makeup',
          id: 1,
        },
        {
          title: 'HairCare',
          id: 2,
        },
        {
          title: 'Fragrance',
          id: 3,
        },
        {
          title: 'Salon',
          id: 4,
        },
      ],
    },
    {
      title: 'Home',
      id: 3,
      isSelected: false,
      subCategory: [
        {
          title: 'Decor',
          id: 1,
        },
        {
          title: 'Storage',
          id: 2,
        },
        {
          title: 'Bath Edit',
          id: 3,
        },
        {
          title: 'Curtains',
          id: 4,
        },
      ],
    },
  ]);
  const [SelectedCategory, setSelectedCategory] = useState<any>({});

  useEffect(() => {
    console.log('----in Home tab');
  }, []);
  const handleTabChange = (item: any) => {
    let newArray = [...mainCategory];
    newArray.map(i => {
      if (i.id == item.id) {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    setMainCategory(newArray);
    setSelectedCategory(item);
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{height: 160}}>
        <Header title="Myntra" isBack={false} isHomePage={true} />
        <View
          style={{
            width: '100%',
            marginTop: 5,
            flexDirection: 'row',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              width: '90%',
              // marginTop: 5,
              flexDirection: 'row',
              // backgroundColor: 'red',
            }}>
            {mainCategory.map(i => (
              <>
                <TouchableOpacity
                  style={{
                    padding: 5,
                    borderRadius: 50,
                    borderWidth: 1,
                    marginHorizontal: 5,
                    width: '31%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#282c3f',
                    backgroundColor: i.isSelected ? '#282c3f' : 'white',
                  }}
                  onPress={() => handleTabChange(i)}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: i.isSelected ? 'white' : '#282c3f',
                      fontWeight: 'bold',
                    }}>
                    {i.title}
                  </Text>
                </TouchableOpacity>
              </>
            ))}
          </View>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                // backgroundColor: 'red',
                width: 35,
                height: 35,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                // padding: 5,
              }}
              onPress={() => navigation.navigate('Category_List')}>
              <Ionicons name="grid-outline" size={22} />
            </TouchableOpacity>
          </View>
        </View>
        {SelectedCategory?.subCategory?.map((i2: any) => (
          <TouchableOpacity onPress={() => console.log('--->>.', i2)}>
            <Text>{i2.title}</Text>
          </TouchableOpacity>
        ))}
        <SlidingComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10, // Adjust this to control the spacing on the sides of the list
  },
  itemContainer: {
    paddingHorizontal: 10, // Adjust this to control the space around each item
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    width: 5, // Adjust this to control the space between items
  },
});
