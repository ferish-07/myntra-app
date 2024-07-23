import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Demo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <View style={styles.circleContainer}>
        <View style={styles.halfBorder}></View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>F</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    position: 'absolute',
    top: '50%',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25,
  },
  halfBorder: {
    width: 50,
    height: 25,
    borderTopWidth: 2, // Set the desired border width
    borderColor: 'black',
    borderRadius: 25,
    position: 'absolute',
    top: 0,
  },
  circleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Demo;
