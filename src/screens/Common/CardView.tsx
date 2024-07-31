import {
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

interface CardViewProps {
  title: string;
  cardStyle: StyleProp<ViewStyle>;
  marginTop: Range<10, 50>;
  isTextInput: Boolean;
  placeholder: string;
}
export default function CardView(props: CardViewProps) {
  const {title, cardStyle, marginTop, isTextInput, placeholder} = props;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: marginTop,
      }}>
      <View style={cardStyle}>
        <Text style={{color: 'black', fontSize: 18}}>{title}</Text>
        {isTextInput ? (
          <TextInput
            style={{
              backgroundColor: '#F0F0F0',
              padding: Platform.OS == 'android' ? 0 : 8,
              width: '80%',
              marginTop: 8,
              borderRadius: 5,
              paddingHorizontal: 8,
            }}
            placeholder={placeholder}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
