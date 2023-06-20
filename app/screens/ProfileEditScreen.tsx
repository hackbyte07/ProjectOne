import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {backgroundColor, fontColorWhite} from '../assets/colors/colors';
import {firebase} from '@react-native-firebase/auth';
import {userType, userCollections} from '../firebase/firestore/usersDb';

import {useTheme} from '@react-navigation/native';
import EditTextInput from '../components/EditTextInput';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

const ProfileEditScreen = () => {
  const [user, setUser] = useState<userType>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [pickerResponse, setPickerResponse] = useState<
    ImagePickerResponse | undefined | null
  >(null);

  useEffect(() => {
    const currentUser =
      firebase.auth().currentUser?.email !== null
        ? firebase.auth().currentUser?.email?.toString()
        : '';
    if (currentUser !== '') {
      userCollections
        .doc(currentUser)
        .get()
        .then(result => {
          const data = result.data() as userType;
          setUser(data);
          setName(data.name);
          setEmail(data.email);
          setPhoneNumber(data.phoneNumber.toString());
        })
        .catch(error => console.log(error));
    }
  }, []);

  const launchImagePicker = useCallback(async () => {
    try {
      const request = await launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false,
          selectionLimit: 1,
        },
        setPickerResponse,
      );
    } catch (error) {}
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={backgroundColor}
        style={[styles.container, {paddingTop: 15}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.picIconCont}>
          {pickerResponse !== null && pickerResponse?.assets !== undefined ? (
            <Image
              source={{uri: pickerResponse?.assets[0].uri}}
              style={styles.imageIcon}
            />
          ) : (
            <Icon
              name="picture"
              size={50}
              onPress={() => launchImagePicker()}
            />
          )}
        </View>
        <View style={styles.spacer} />
        <Text style={styles.text}>{`Name - ${user?.name}`}</Text>
        <EditTextInput
          value={name}
          onValueChange={newValue => setName(newValue)}
          keyBoardType="default"
        />
        <View style={styles.spacer} />
        <Text style={styles.text}>{`Email - ${user?.email}`}</Text>
        <EditTextInput
          value={email}
          onValueChange={newValue => setEmail(newValue)}
          keyBoardType="default"
        />
        <View style={styles.spacer} />
        <Text style={styles.text}>{`Phone no. - ${user?.phoneNumber}`}</Text>
        <EditTextInput
          value={phoneNumber}
          onValueChange={newValue => setPhoneNumber(newValue)}
          keyBoardType="default"
        />
        <TouchableOpacity style={styles.editView} onPress={() => {}}>
          <Icon name="save" size={25} color={fontColorWhite} />
          <Text style={styles.editText}>Save</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: fontColorWhite,
    marginVertical: 7.5,
    marginHorizontal: 15,
  },
  spacer: {
    marginTop: 15,
  },
  editView: {
    flexDirection: 'row',
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 25,
    borderRadius: 5,
    width: 100,
    alignSelf: 'center',
  },
  editText: {
    marginLeft: 10,
    fontSize: 18,
    color: fontColorWhite,
  },
  picIconCont: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageIcon: {
    height: 100,
    width: 100,
  },
});
