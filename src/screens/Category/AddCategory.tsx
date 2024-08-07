import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Common/Header';
import CardView from '../Common/CardView';
import {Dropdown} from 'react-native-element-dropdown';
export default function AddCategory({navigation}: any) {
  const [dropdownData, setDropDownData] = useState([
    {
      placeholder: 'Select Category',
      id: 'main_category',
      data: [
        {
          label: 'Mens',
          value: 'Men',
        },
      ],
    },
    {
      placeholder: 'Select Section',
      id: 'section',
      data: [],
    },
    {
      placeholder: 'Select Sub Section',
      id: 'sub_section',
      data: [],
    },
  ]);
  const [value, setValue] = useState<any>(null);
  const [newValue, setNewValue] = useState<any>(null);
  // const [newValue, setValue] = useState<any>(null);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? 80 : 0}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header title={'Manage Category'} navigation={navigation} />
        <ScrollView
          style={{height: '98%', marginTop: 1}}
          keyboardShouldPersistTaps={'always'}>
          <CardView
            title="Demo"
            marginTop={5}
            isTextInput={true}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={['Id', 'Category']}
            textInputCount={2}
            onSubmitClick={obj => {
              console.log('-----', obj);
              setNewValue(obj);
            }}
          />
          <CardView
            title="USER DETAILS"
            marginTop={5}
            isTextInput={true}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={[
              'First Name',
              'Last Name',
              'Email',
              'Contact Number',
              'Password',
            ]}
            textInputCount={5}
            onSubmitClick={obj => {
              console.log('-----', obj);
              setValue(obj);
            }}
          />
          <View
            style={{
              // width: '90%',
              // backgroundColor: 'red',
              // alignSelf: 'center',
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
              flex: 1,
            }}>
            {newValue ? (
              <View style={{borderRadius: 10, borderWidth: 1, padding: 10}}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>DEMO CARD VALUE</Text>
                </View>
                {['Id', 'Category'].map((i, index) => {
                  return (
                    <View>
                      {newValue ? (
                        <>
                          <Text>{`    ${i} - ${newValue?.TextInputValue[index]}`}</Text>
                        </>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ) : null}

            {value ? (
              <View style={{borderRadius: 10, borderWidth: 1, padding: 10}}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>
                    USER DETAILS CARD VALUE
                  </Text>
                </View>
                {[
                  'First Name',
                  'Last Name',
                  'Email',
                  'Contact Number',
                  'Password',
                ].map((i, index) => {
                  return (
                    <View>
                      {value ? (
                        <>
                          <Text>{`   ${i} - ${value?.TextInputValue[index]}`}</Text>
                        </>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ) : null}
          </View>
          {/* <CardView
            title="Add Section"
            marginTop={5}
            isTextInput={true}
            isDropDown={true}
            dropDownData={dropdownData}
            placeholder={['Type here..']}
            textInputCount={1}
            dropDownCount={2}
            onSubmitClick={obj => {
              console.log('-----', obj);
            }}
            onDropDownChange={data => {
              console.log('-------far', data);
              let newData = dropdownData;
              if (data.id == 'main_category') {
                newData[1].data = [
                  {
                    label: 'T-shirt',
                    value: 'T-shirt',
                  },
                ];
              }
              if (data.id == 'section') {
                newData[2].data = [
                  {
                    label: 'long',
                    value: 'long',
                  },
                  {
                    label: 'short',
                    value: 'short',
                  },
                ];
              }
            }}
            onDeletePressed={data => console.log('-----datete', data)}
          />
          <CardView
            title="Add Sub Section"
            marginTop={5}
            isTextInput={true}
            isDropDown={true}
            dropDownData={dropdownData}
            placeholder={['Type here..']}
            textInputCount={1}
            dropDownCount={2}
            onSubmitClick={obj => {
              console.log('-----', obj);
            }}
            onDropDownChange={data => {
              console.log('-------far', data);
              let newData = dropdownData;
              if (data.id == 'main_category') {
                newData[1].data = [
                  {
                    label: 'T-shirt',
                    value: 'T-shirt',
                  },
                ];
              }
              if (data.id == 'section') {
                newData[2].data = [
                  {
                    label: 'long',
                    value: 'long',
                  },
                  {
                    label: 'short',
                    value: 'short',
                  },
                ];
              }
            }}
            onDeletePressed={data => console.log('-----datete', data)}
          />
          <CardView
            title="Add Brands"
            marginTop={5}
            isTextInput={true}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={['Type here..']}
            textInputCount={1}
            onSubmitClick={obj => {
              console.log('-----', obj);
            }}
          />
          <CardView
            title="Add Brands"
            marginTop={5}
            isTextInput={true}
            isDropDown={false}
            dropDownData={dropdownData}
            placeholder={['Type here..']}
            textInputCount={1}
            onSubmitClick={obj => {
              console.log('-----', obj);
            }}
          /> */}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
