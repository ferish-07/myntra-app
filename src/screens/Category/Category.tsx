import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import Header from '../Common/Header';
import Icon from 'react-native-vector-icons/Ionicons';
const categories = [
  {
    id: '1',
    title: 'Women',
    items: [
      {
        id: '1',
        title: 'Westernwear',
        subCategory: [
          {title: 'Skirts'},
          {title: 'Shorts'},
          {title: 'Playsuits'},
        ],
      },
      {
        id: '2',
        title: 'Ethnic & Fusionwear',
        subCategory: [
          {title: 'Sub Title 1 Item 2'},
          {title: 'Sub Title 2 Item 2'},
          {title: 'Sub Title 3 Item 2'},
        ],
      },
      {
        id: '3',
        title: 'Item 3',
        subCategory: [
          {title: 'Sub Title 1 Item 3'},
          {title: 'Sub Title 2 Item 3'},
          {title: 'Sub Title 3 Item 3'},
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Jewellery',
    items: [
      {
        id: '1',
        title: 'Explore Jewellery Store',
        subCategory: [
          {title: 'Sub Title 1'},
          {title: 'Sub Title 2'},
          {title: 'Sub Title 3'},
        ],
      },
      {
        id: '2',
        title: 'Ethnic Jewellery',
        subCategory: [
          {title: 'Sub Title 1 Item 2'},
          {title: 'Sub Title 2 Item 2'},
          {title: 'Sub Title 3 Item 2'},
        ],
      },
      {
        id: '3',
        title: 'Western Jewellery',
        subCategory: [
          {title: 'Sub Title 1 Item 3'},
          {title: 'Sub Title 2 Item 3'},
          {title: 'Sub Title 3 Item 3'},
        ],
      },
      {
        id: '4',
        title: 'Fine Jewellery',
        subCategory: [
          {title: 'Sub Title 1 Item 3'},
          {title: 'Sub Title 2 Item 3'},
          {title: 'Sub Title 3 Item 3'},
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Home & Livinge',
    items: [
      {
        id: '1',
        title: 'Explore Jewellery Store',
        subCategory: [
          {title: 'Sub Title 1'},
          {title: 'Sub Title 2'},
          {title: 'Sub Title 3'},
        ],
      },
      {
        id: '2',
        title: 'Ethnic Jewellery',
        subCategory: [
          {title: 'Sub Title 1 Item 2'},
          {title: 'Sub Title 2 Item 2'},
          {title: 'Sub Title 3 Item 2'},
        ],
      },
      {
        id: '3',
        title: 'Western Jewellery',
        subCategory: [
          {title: 'Sub Title 1 Item 3'},
          {title: 'Sub Title 2 Item 3'},
          {title: 'Sub Title 3 Item 3'},
        ],
      },
      {
        id: '4',
        title: 'Fine Jewellery',
        subCategory: [
          {title: 'Sub Title 1 Item 3'},
          {title: 'Sub Title 2 Item 3'},
          {title: 'Sub Title 3 Item 3'},
        ],
      },
    ],
  },
];
const {width} = Dimensions.get('window');
interface AnimationRefs {
  [key: string]: any; // Replace `any` with a more specific type if possible
}
const Category = ({navigation}: any) => {
  const [expandedCategory, setExpandedCategory] = useState(null); // To keep track of the expanded category
  const [expandedSubCategory, setExpandedSubCategory] = useState(null); // To  keep track of the expanded category
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleExpand = (categoryId: any) => {
    setExpandedSubCategory(null);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCategory(categoryId);
  };
  const toggleExpandSubCategory = (categoryId: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedSubCategory === categoryId) {
      setExpandedSubCategory(null);
    } else {
      setExpandedSubCategory(categoryId);
    }
  };

  const _renderSection = ({item, index}: any) => {
    return (
      <>
        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={() => toggleExpandSubCategory(item.id)}>
          <View
            style={{
              // padding: 5,
              backgroundColor:
                expandedSubCategory === item.id ? 'white' : '#f8f8f8',
              paddingHorizontal: 15,
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                flexDirection: 'row',
                // margin: 5,
                borderColor: '#e9eaec',
                padding: 8,
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 15}}>{item.title}</Text>

              {expandedSubCategory === item.id ? (
                <Icon name="chevron-up-outline" size={20} />
              ) : (
                <Icon name="chevron-down-outline" size={20} />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <Animated.View
          style={{
            overflow: 'hidden',
          }}>
          {expandedSubCategory === item.id && (
            <View style={[{paddingHorizontal: 10, backgroundColor: 'white'}]}>
              <FlatList
                data={item.subCategory}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{marginLeft: 20, paddingHorizontal: 5}}
                      onPress={() =>
                        navigation.navigate('Products', {title: item.title})
                      }>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          //  flexDirection: 'row',
                          // margin: 5,
                          borderColor: '#e9eaec',
                          padding: 8,
                          //  justifyContent: 'space-between',
                        }}>
                        <Text>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </Animated.View>
      </>
    );
  };
  const _renderItem = ({item, index}: any) => {
    let right = 0;
    const firstItemIndexAsPerRow = index - (index % 3);
    const lastItemIndexAsPerRow = firstItemIndexAsPerRow + 2;
    const middleItemIndexAsPerRow = firstItemIndexAsPerRow + 1;
    if (firstItemIndexAsPerRow == item.id - 1) {
      right = Dimensions.get('window').width / 26;
    }
    if (lastItemIndexAsPerRow == item.id - 1) {
      right = Dimensions.get('window').width / 1.52;
    }

    if (middleItemIndexAsPerRow == item.id - 1) {
      right = Dimensions.get('window').width / 2.87;
    }
    return (
      <View
        style={[
          styles.categoryContainer,
          {
            zIndex: expandedCategory === item.id ? 1000 : 0,
          },
        ]}>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          style={[
            styles.categoryHeader,
            {
              borderWidth: 1,
              borderColor: expandedCategory === item.id ? '#ff406c' : '#f8f8f8',
            },
          ]}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            overflow: 'hidden',
            // height: animatedHeight,
            width: Dimensions.get('window').width,

            // maxHeight: Dimensions.get('window').height * 0.4,
            // marginHorizontal: 10,
            right: right,
            marginTop: 5,
            // backgroundColor: 'red',
          }}>
          {expandedCategory === item.id && (
            <View
              style={[
                styles.subItemsContainer,
                {
                  borderTopWidth: 1,
                  borderTopColor: '#ff406c',
                },
              ]}>
              <FlatList data={item.items} renderItem={_renderSection} />
            </View>
          )}
        </Animated.View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header title="Categories" navigation={navigation} />
      <FlatList
        data={categories}
        // renderItem={renderItem}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        numColumns={3} // Set to 3 items per row
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  categoryContainer: {
    width: '30%', // Makes sure 3 items are placed in one row
    margin: 5, // Adjusts the spacing between the items
  },
  categoryHeader: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center', // Centers the content horizontally
    justifyContent: 'center', // Centers the content vertically
    height: width / 3 - 20, // Adjusts height to ensure a square shape
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Centers the text within the category
  },
  subItemsContainer: {
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
    // borderRadius: 10,
    // zIndex: 1000,
  },
  subItemText: {
    paddingVertical: 5,
    fontSize: 16,
  },
});
export default Category;
