import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native';

type props = {
  title: string;
  icon: string;
  onPress: () => void;
};

const {width} = Dimensions.get('screen');

const SettingItem: FC<props> = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.view}>
        <Icon name={icon} size={25} color={'white'} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginVertical: 7.5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginLeft: 15
  },
});
