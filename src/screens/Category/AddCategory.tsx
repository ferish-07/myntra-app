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
            title="Add Main Category"
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
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
