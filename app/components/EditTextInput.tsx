import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {TextInput} from 'react-native';
import {fontColorWhite, primaryColor} from '../assets/colors/colors';

type props = {
  value: string;
  onValueChange: (newValue: string) => void;
  keyBoardType: 'default' | 'phone-pad';
};

const EditTextInput: FC<props> = ({value, onValueChange, keyBoardType}) => {
  return (
    <TextInput
      value={value}
      onChangeText={newValue => onValueChange(newValue)}
      keyboardType={keyBoardType}
      style={styles.container}
      cursorColor={fontColorWhite}
      numberOfLines={1}
      maxLength={50}
    />
  );
};

export default EditTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    marginHorizontal: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    color: fontColorWhite,
  },
});
