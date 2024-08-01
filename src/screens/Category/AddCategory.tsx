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
  const [TextInputValue, setTextInputValue] = useState<any>({});
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
            isDropDown={true}
            placeholder={['p1', 'p2', 'p3', 'p4', 'p5']}
            textInputCount={3}
            onChangeText={setTextInputValue}
            setTextInputValue={setTextInputValue}
            TextInputValue={TextInputValue}
            onSubmitClick={() => {
              console.log('-----', TextInputValue);
            }}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
