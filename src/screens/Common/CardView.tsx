import {
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
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
  cardStyle?: StyleProp<ViewStyle>;
  marginTop: Range<0, 50>;
  isTextInput: Boolean;
  placeholder: string[];
  isResetButton?: Boolean;
  buttonView?: Boolean;
  isSaveButton?: Boolean;
  textInputCount?: number;
  onChangeText: (obj: object) => void;
  TextInputValue: any;
  setTextInputValue: React.Dispatch<React.SetStateAction<any>>;
  onSubmitClick: () => void;
  isDropDown: Boolean;
}

export default function CardView(props: CardViewProps) {
  const {
    title,
    cardStyle,
    marginTop,
    isTextInput,
    placeholder,
    isResetButton = true,
    buttonView = true,
    isSaveButton = true,
    textInputCount = 1,
    onChangeText,
    TextInputValue,
    setTextInputValue,
    onSubmitClick,
    isDropDown,
  } = props;
  const [listTextInput, setListTextInput] = useState<any[]>([]);
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  const [values, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    let inputArr = [];
    for (let i = 0; i < textInputCount; i++) {
      inputArr.push(i);
    }
    setListTextInput(inputArr);
  }, [textInputCount]);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: marginTop,
      }}>
      <View
        style={[
          cardStyle,
          {
            backgroundColor: 'white',
            width: '90%',
            elevation: 2,
            borderRadius: 5,
            alignItems: 'center',
            // height: 40,
            // shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            padding: 8,
            margin: 5,
          },
        ]}>
        <Text style={{color: 'black', fontSize: 18}}>{title}</Text>
        {isTextInput
          ? listTextInput.map((i, index) => {
              return (
                <TextInput
                  style={{
                    backgroundColor: '#F0F0F0',
                    padding: Platform.OS == 'android' ? 0 : 8,
                    width: '80%',
                    marginTop: 8,
                    borderRadius: 5,
                    paddingHorizontal: 8,
                  }}
                  placeholder={placeholder[index]}
                  value={TextInputValue[`${index}`]}
                  onChangeText={text => {
                    let newObj1 = {};
                    let newObj = {
                      ...TextInputValue,
                      [`${index}`]: text,
                    };
                    onChangeText(newObj);
                  }}
                  placeholderTextColor={'lightgrey'}
                />
              );
            })
          : null}
        {isDropDown ? (
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={values}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderItem={({label, value}) => {
              // console.log('selected', selected);
              return (
                <View
                  style={{
                    backgroundColor: values == value ? 'red' : 'white',
                    padding: 17,
                  }}>
                  <Text style={{fontSize: 16}}>{label}</Text>
                </View>
              );
            }}
            // renderRightIcon={() => (
            //   <View>
            //     <Text>D</Text>
            //   </View>
            // )}
            // renderLeftIcon={() => (
            //   <View>
            //     <Text>l</Text>
            //   </View>
            // )}
            // itemContainerStyle={{backgroundColor: 'red'}}
            // containerStyle={{backgroundColor: 'yellow', width: '50%'}}
            // dropdownPosition=''
          />
        ) : null}
        {buttonView ? (
          <View
            style={{
              marginTop: 10,
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            {isResetButton ? (
              <TouchableOpacity
                style={{
                  width: '25%',
                  backgroundColor: 'white',
                  padding: 5,
                  elevation: 2,
                  borderRadius: 5,
                  alignItems: 'center',
                  // height: 40,
                  // shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                }}
                onPress={() => setTextInputValue({})}>
                <Text style={{color: 'black', fontSize: 16}}>Reset</Text>
              </TouchableOpacity>
            ) : null}
            {isSaveButton ? (
              <TouchableOpacity
                style={{
                  width: '28%',
                  backgroundColor: '#1976D2',
                  padding: 5,
                  elevation: 2,
                  borderRadius: 5,
                  alignItems: 'center',
                  // height: 40,
                  // shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  marginLeft: 8,
                }}
                onPress={() => onSubmitClick()}>
                <Text style={{color: 'white', fontSize: 16}}>Save</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '50%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
