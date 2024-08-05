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
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Fonts} from '../../utils/assets/fonts';
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
const {width: screenWidth} = Dimensions.get('window');
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
  // onChangeText: (obj: object) => void;
  // TextInputValue: any;
  // setTextInputValue: React.Dispatch<React.SetStateAction<any>>;
  onDropDownChange?: ({id}: {id: string}) => void;
  onSubmitClick: ({}: {}) => void;
  onDeletePressed?: ({}: {}) => void;
  isDropDown: Boolean;
  dropDownCount?: number;
  dropDownData: any;
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
    onSubmitClick,
    isDropDown,
    dropDownCount = 1,
    dropDownData,
    onDropDownChange = () => {},
    onDeletePressed = () => {},
  } = props;
  const [listTextInput, setListTextInput] = useState<any[]>([]);
  const [TextInputValue, setTextInputValue] = useState<any>({});

  const [values, setValue] = useState<any>({});
  // const [isFocus, setIsFocus] = useState(false);
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
                    padding: Platform.OS == 'android' ? 5 : 8,
                    width: '100%',
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
                    setTextInputValue(newObj);
                  }}
                  placeholderTextColor={'lightgrey'}
                />
              );
            })
          : null}
        {isDropDown ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              // justifyContent: 'space-',
              // margin: 5,
              // width: '80%',
            }}>
            {Array(dropDownCount)
              .fill('')
              .map((i, index) => {
                return (
                  <Dropdown
                    disable={dropDownData[index].data.length == 0}
                    style={[
                      styles.dropdown,
                      // isFocus && {borderColor: 'blue'},
                      {
                        marginLeft: index == 1 ? 6 : 0,
                        marginTop: 5,
                      },
                    ]}
                    dropdownPosition="auto"
                    placeholderStyle={styles.placeholderStyle} // Dropdown placholder Styling when item is not selected
                    selectedTextStyle={styles.selectedTextStyle} // text when Select Value on Dropdown
                    inputSearchStyle={styles.inputSearchStyle} //search Bar Styling
                    iconStyle={styles.iconStyle}
                    data={dropDownData[index].data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={dropDownData[index].placeholder}
                    searchPlaceholder="Search..."
                    value={values[index]}
                    // onFocus={() => setIsFocus(true)}
                    // onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      let value = {
                        ...values,
                        [index]: item.value,
                        [dropDownData[index].id]: item.value,
                      };
                      setValue(value);
                      onDropDownChange({...item, id: dropDownData[index].id});
                      // setIsFocus(false);
                    }}
                    containerStyle={{
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      // width: screenWidth * 0.8,
                      // left: 204,

                      // left: null,
                    }} //Below Container Size Where all list and Search bar is present
                    itemContainerStyle={{
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                    renderItem={item => {
                      return (
                        <View
                          style={{
                            backgroundColor:
                              values[index] == item.value ? '#F6F7F8' : 'white',
                            padding: 17,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={{fontSize: 16}}>{item.label}</Text>
                          <TouchableOpacity
                            style={{
                              // backgroundColor: 'white',
                              width: '15%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() =>
                              onDeletePressed(
                                dropDownData[index].data[item._index],
                              )
                            }>
                            <Text
                              style={{fontSize: 15, fontFamily: Fonts.myntra}}>
                              {'delete-filled'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                );
              })}
          </View>
        ) : null}
        {buttonView ? (
          <View
            style={{
              marginTop: 10,
              width: '100%',
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
                onPress={() => {
                  setTextInputValue({});
                  setValue({});
                }}>
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
                onPress={() =>
                  onSubmitClick({TextInputValue, dropDownValues: values})
                }>
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '48%',
    // flex: 1,
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
