import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

type props = {
  visible: boolean | undefined;
  text: string | undefined;
};

const ErrorText: FC<props> = ({visible, text}) => {
  return <Text style={styles.text}>{visible === true || visible !== undefined ? text : ''}</Text>;
};

export default ErrorText;

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        marginHorizontal: 15,
        marginVertical: 5,
        color: 'red'        
    }
});
