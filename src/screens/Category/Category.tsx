import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
const categories = [
  {id: '1', title: 'Accessories', items: ['Item 1', 'Item 2', 'Item 3']},
  {
    id: '2',
    title: 'Jewellery',
    items: [
      'Explore Jewellery Store',
      'Ethnic Jewellery',
      'Western Jewellery',
      'Fine Jewellery',
    ],
  },
  {id: '3', title: 'Home & Living', items: ['Item 1', 'Item 2', 'Item 3']},
  {id: '4', title: 'Home & Living2', items: ['Item 1', 'Item 2', 'Item 3']},
];
const {width} = Dimensions.get('window');
interface AnimationRefs {
  [key: string]: any; // Replace `any` with a more specific type if possible
}
const Category = () => {
  const getRowIndices = (numColumns: number, totalItems: number) => {
    const rows = Math.ceil(totalItems / numColumns);
    const rowIndices = [];

    for (let row = 0; row < rows; row++) {
      const firstIndex = row * numColumns;
      const lastIndex = Math.min((row + 1) * numColumns - 1, totalItems - 1);
      const middleIndex = Math.floor((firstIndex + lastIndex) / 2);
      rowIndices.push({firstIndex, lastIndex, middleIndex});
    }

    return rowIndices;
  };
  const rowIndices = getRowIndices(3, categories.length);
  console.log('------->>>>>>>', rowIndices);
  const [expandedCategory, setExpandedCategory] = useState(null); // To keep track of the expanded category
  const animationRefs = useRef<AnimationRefs>({}).current; // To store Animated.Value for each category
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
  const renderItem = ({item, index}: any) => {
    if (!animationRefs[item.id]) {
      animationRefs[item.id] = new Animated.Value(0); // Initialize animated value if not present
    }
    const animatedHeight = animationRefs[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 150], // Adjust based on content size
      extrapolate: 'clamp',
    });
    const row = Math.floor(index / 3);
    const {firstIndex, lastIndex, middleIndex} = rowIndices[row];

    const isFirstInRow = index === firstIndex;
    const isLastInRow = index === lastIndex;
    const isMiddleInRow = index === middleIndex;
    let right = 0;
    if (isFirstInRow) {
      right = 0;
    }
    if (isLastInRow) {
      right = 260;
    }
    if (isMiddleInRow) {
      right = 130;
    }
    return (
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            overflow: 'hidden',
            height: animatedHeight,
            width: Dimensions.get('screen').width - 30,
            right: right,
          }}>
          {expandedCategory === item.id && (
            <View style={styles.subItemsContainer}>
              {item.items.map((subItem: any, index: number) => (
                <Text key={index} style={styles.subItemText}>
                  {subItem}
                </Text>
              ))}
            </View>
          )}
        </Animated.View>
      </View>
    );
  };
  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
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
    flex: 1 / 3, // Makes sure 3 items are placed in one row
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  subItemText: {
    paddingVertical: 5,
    fontSize: 16,
  },
});
export default Category;
