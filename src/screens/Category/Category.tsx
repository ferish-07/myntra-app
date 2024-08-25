import React, {useState, useRef} from 'react';
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
} from 'react-native';
const categories = [
  {
    id: '1',
    title: 'Accessories',
    items: [
      {
        id: '1',
        title: 'Item 1',
        subCategory: [
          {title: 'Sub Title 1'},
          {title: 'Sub Title 2'},
          {title: 'Sub Title 3'},
        ],
      },
      {
        id: '2',
        title: 'Item 2',
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
const Category = () => {
  const [expandedCategory, setExpandedCategory] = useState(null); // To keep track of the expanded category
  const [expandedSubCategory, setExpandedSubCategory] = useState(null); // To keep track of the expanded category
  const [contentHeight, setContentHeight] = useState<any>({});
  const [contentSubHeight, setContentSubHeight] = useState<any>({});
  const animationRefs = useRef<AnimationRefs>({}).current; // To store Animated.Value for each category
  const animationRefsSubCategory = useRef<AnimationRefs>({}).current; // To store Animated.Value for each category
  const toggleExpand = (categoryId: any) => {
    if (expandedCategory === categoryId) {
      // Collapse the currently expanded category
      Animated.timing(animationRefs[categoryId], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setExpandedCategory(null);
      });
    } else {
      if (expandedCategory) {
        // Collapse the previously expanded category
        Animated.timing(animationRefs[expandedCategory], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      // Expand the selected category
      setExpandedCategory(categoryId);
      Animated.timing(animationRefs[categoryId], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };
  const toggleExpandSubCategory = (categoryId: any) => {
    if (expandedSubCategory === categoryId) {
      // Collapse the currently expanded category
      Animated.timing(animationRefsSubCategory[categoryId], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setExpandedSubCategory(null);
      });
    } else {
      if (expandedSubCategory) {
        // Collapse the previously expanded category
        Animated.timing(animationRefsSubCategory[expandedSubCategory], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      // Expand the selected category
      setExpandedSubCategory(categoryId);
      Animated.timing(animationRefsSubCategory[categoryId], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };
  const _renderSection = ({item, index}: any) => {
    if (!animationRefsSubCategory[item.id]) {
      animationRefsSubCategory[item.id] = new Animated.Value(0); // Initialize animated value if not present
    }
    const animatedHeight = animationRefsSubCategory[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentSubHeight[item.id] || 1], // Adjust based on content size
      extrapolate: 'clamp',
    });
    const row = Math.floor(index / 3);

    return (
      <>
        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={() => toggleExpandSubCategory(item.id)}>
          <View style={{backgroundColor: 'red', margin: 5, padding: 5}}>
            <Text style={{fontSize: 15}}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        <Animated.View
          style={{
            overflow: 'hidden',
            // height: animatedHeight,
            // width: Dimensions.get('window').width,

            // maxHeight: Dimensions.get('window').height * 0.4,
            // marginHorizontal: 10,

            marginTop: 5,
            // backgroundColor: 'red',
          }}>
          {expandedSubCategory === item.id && (
            <View
              style={[styles.subItemsContainer, {paddingHorizontal: 10}]}
              onLayout={(event: any) => {
                const {height} = event.nativeEvent.layout;
                setContentSubHeight((prev: any) => ({
                  ...prev,
                  [item.id]: height,
                }));
              }}>
              <FlatList
                data={item.subCategory}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <Text>{item.title}</Text>
                    </View>
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
    if (!animationRefs[item.id]) {
      animationRefs[item.id] = new Animated.Value(0); // Initialize animated value if not present
    }
    const animatedHeight = animationRefs[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight[item.id] || 1], // Adjust based on content size
      extrapolate: 'clamp',
    });
    const row = Math.floor(index / 3);

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
          {zIndex: expandedCategory === item.id ? 1000 : 0},
        ]}>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            overflow: 'hidden',
            height: animatedHeight,
            width: Dimensions.get('window').width,

            // maxHeight: Dimensions.get('window').height * 0.4,
            // marginHorizontal: 10,
            right: right,
            marginTop: 5,
            // backgroundColor: 'red',
          }}>
          {expandedCategory === item.id && (
            <View
              style={[styles.subItemsContainer, {paddingHorizontal: 10}]}
              onLayout={(event: any) => {
                const {height} = event.nativeEvent.layout;
                setContentHeight((prev: any) => ({
                  ...prev,
                  [item.id]: height,
                }));
              }}>
              <FlatList data={item.items} renderItem={_renderSection} />
            </View>
          )}
        </Animated.View>
      </View>
    );
  };
  return (
    <FlatList
      data={categories}
      // renderItem={renderItem}
      renderItem={_renderItem}
      keyExtractor={item => item.id}
      numColumns={3} // Set to 3 items per row
      contentContainerStyle={styles.list}
    />
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
    backgroundColor: 'white',
    // borderRadius: 10,
    // zIndex: 1000,
  },
  subItemText: {
    paddingVertical: 5,
    fontSize: 16,
  },
});
export default Category;
