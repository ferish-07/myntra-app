import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
type Layout = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const initialLayout = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};
interface FloatingTextInput {
  TextInputStyle?: StyleProp<ViewStyle>;
  mainViewStyle?: StyleProp<ViewStyle>;
  keyboardType?: 'email-address' | 'default' | 'number-pad';
  label: string;
  secureTextEntry?: boolean;
  onChangeText: (string: string) => void;
}
export default function FloatingTextInput(props: FloatingTextInput) {
  const {
    TextInputStyle = {},
    mainViewStyle = {},
    keyboardType = 'default',
    label = 'LABEL',
    secureTextEntry = false,
    onChangeText,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [inputLayout, setInputLayout] = useState<Layout>(initialLayout);
  const [labelLayout, setLabelLayout] = useState<Layout>(initialLayout);
  const [textInputValue, setTextInputValue] = useState<string>();
  const inputRef = useRef<any>(null);
  const animationValue = useRef(new Animated.Value(0)).current;

  const animation = (value: number) => {
    Animated.timing(animationValue, {
      toValue: value,
      duration: 250,
      useNativeDriver: false, // false value is important
    }).start();
  };

  const fontSizeAnimation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 12],
  });

  const fontColorAnimation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', '#ff3f6c'],
  });

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      inputLayout.height / 2 - labelLayout.height / 2,
      -labelLayout.height / 2,
    ], // `-labelLayout.height / 2` for second floating label version
  });

  const onTextInputWrapperPress = useCallback(() => {
    setIsFocused(previous => {
      if (previous && !textInputValue) {
        inputRef.current.blur();
      } else {
        inputRef.current.focus();
      }
      return !previous;
    });
  }, []);

  const onTextInputFocus = () => {
    setIsFocused(true);
    animation(1);
  };

  const onTextInputBlur = () => {
    if (textInputValue) return;
    setIsFocused(false);
    animation(0);
  };

  const onTextInputLayoutChange = useCallback((e: LayoutChangeEvent) => {
    const layout = e.nativeEvent.layout;
    setInputLayout(layout);
  }, []);

  const onLableLayoutChange = useCallback((e: LayoutChangeEvent) => {
    const layout = e.nativeEvent.layout;
    setLabelLayout(layout);
  }, []);

  const labelDynamicStyles = {
    fontSize: fontSizeAnimation,
    color: fontColorAnimation,
    backgroundColor: 'white',
    transform: [
      {
        translateY: translateY,
      },
    ],
  };

  return (
    <Pressable
      style={[styles.input_block, mainViewStyle]}
      onPress={onTextInputWrapperPress}>
      <TextInput
        ref={inputRef}
        onLayout={onTextInputLayoutChange}
        style={[
          styles.input,
          {borderColor: isFocused ? '#ff3f6c' : 'gray'},
          TextInputStyle,
        ]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={textInputValue}
        onChangeText={text => {
          onChangeText(text);
          setTextInputValue(text);
        }}
        autoCorrect={false}
        autoCapitalize="none"
        onFocus={onTextInputFocus}
        onBlur={onTextInputBlur}
      />
      <Animated.Text
        onLayout={onLableLayoutChange}
        style={[styles.label, labelDynamicStyles]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    gap: 20,
  },
  input_block: {
    position: 'relative',
    marginTop: 10,
  },
  //   input: {
  //     borderColor: 'gray',
  //     borderBottomWidth: 1,
  //     padding: 10,
  //     fontSize: 15,
  //     color: 'black',
  //     backgroundColor: 'gainsboro',
  //   },
  // input style for second floating label version. Comment above one and uncomment this one.
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontStyle: 'italic',
  },
  label: {
    zIndex: 9,
    // elevation: 4,
    top: 0,
    left: 10,
    position: 'absolute',
    textAlign: 'left',
  },
});
