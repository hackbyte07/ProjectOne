import {
  Alert,
  Button,
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import LinearGradient from 'react-native-linear-gradient';
import {backgroundColor, fontColorWhite} from '../assets/colors/colors';
import SettingItem from '../components/settings_screen/SettingItem';

import {View} from 'react-native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {firebase} from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {userCollections, userType} from '../firebase/firestore/usersDb';
import {TouchableOpacity} from 'react-native';

const {height, width} = Dimensions.get('screen');

const SettingScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  const [modal, setModal] = useState(false);
  const [pickerResponse, setPickerResponse] = useState<
    ImagePickerResponse | undefined | null
  >(null);

  const [user, setUser] = useState<userType>();

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
          setUser(result.data() as userType);
        })
        .catch(error => console.log(error));
    }
    return () => {
      setModal(false)
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
        style={styles.containerLinear}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <SettingItem
          title="Profile"
          icon="user"
          onPress={() => setModal(true)}
        />
        <SettingItem
          title="About"
          icon="info"
          onPress={() => navigation.navigate('AboutScreen')}
        />
        <SettingItem
          title="Privacy policy"
          icon="slack"
          onPress={() => {
            Linking.openURL('https://www.google.com');
          }}
        />
        <View style={styles.button}>
          <Button
            title="Logout"
            onPress={() => {
              Alert.alert(
                'Confirmation',
                'Do you really want to logout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                  },
                  {
                    text: 'Logout',
                    onPress: () => {
                      firebase.auth().signOut();
                      navigation.replace('LoginScreen');
                    },
                  },
                ],
                {cancelable: true},
              );
            }}
          />
        </View>

        <Modal
          visible={modal}
          transparent
          style={styles.modal}
          onDismiss={() => setModal(false)}
          hardwareAccelerated
          animationType="slide">
          <View style={styles.modalView}>
            <Icon
              name="close"
              size={25}
              style={styles.closeIcon}
              onPress={() => {
                setModal(false);
              }}
            />
            <View style={styles.picIconCont}>
              {pickerResponse !== null &&
              pickerResponse?.assets !== undefined ? (
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
            <Text style={styles.text}>{'Name - ' + user?.name}</Text>
            <Text style={styles.text}>{'Email - ' + user?.email}</Text>
            <Text style={styles.text}>{'Phone - ' + user?.phoneNumber}</Text>

            <TouchableOpacity
              style={styles.editView}
              onPress={() => {
                navigation.navigate('ProfileEditScreen');
              }}>
              <Icon name="edit" size={25} color={fontColorWhite} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLinear: {
    padding: 15,
    flex: 1,
  },
  modal: {
    flex: 1,
  },
  modalView: {
    height: height / 2.5,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: height / 5,
    elevation: 5,
    borderRadius: 15,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 15,
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
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
  },
  button: {
    width: width / 2,
    alignSelf: 'center',
    marginTop: 25,
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
});
