import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useMemo} from 'react';
import {Formik} from 'formik';

import * as Yup from 'yup';
import {TouchableOpacity} from 'react-native';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ErrorText from '../../components/ErrorText';
import {RootScreens} from '../../navigation/RootNavigation';
import {useState} from 'react';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {
  backgroundColor,
  fontColorWhite,
  secondaryColor,
} from '../../assets/colors/colors';
import {createAccountWithEmail} from '../../firebase/auth/emailAuth';
import {validatePathConfig} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createUser} from '../../firebase/firestore/usersDb';
import LinearGradient from 'react-native-linear-gradient';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label('Name'),
  email: Yup.string().required().email().label('Email'),
  phone: Yup.string().required().min(10).label('Phone'),
  password: Yup.string().required().min(6).label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required()
    .min(6)
    .label('Confirm Password'),
});

const {height, width} = Dimensions.get('screen');

const SignupScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  const genderRadioButton = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'male',
      },
      {
        id: '2',
        label: 'Female',
        value: 'female',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();

  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.bg}
        colors={backgroundColor}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: 0,
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={value => {
            console.log(value.name);
            setLoading(true);
            createAccountWithEmail(value.email, value.password)
              .then(result => {
                setLoading(false);
                if (result) {
                  createUser(value.name, value.email, value.phone);
                  Alert.alert(
                    'Requested',
                    'Please verify your email address. Link has been sent',
                    [{
                      text: 'Ok',
                      onPress: () => navigation.pop()
                    }]
                  );
                } else {
                  Alert.alert('Failed', 'Registration is Not Successful');
                }
              })
              .catch(() => {
                setLoading(false);
              });
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange('name')}
                placeholderTextColor={fontColorWhite}
                keyboardType="default"
                onBlur={() => setFieldTouched('name', true)}
              />
              <ErrorText visible={touched.name} text={errors.name} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                placeholderTextColor={fontColorWhite}
                keyboardType="email-address"
                onBlur={() => setFieldTouched('email', true)}
              />
              <ErrorText visible={touched.email} text={errors.email} />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor={fontColorWhite}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone', true)}
                keyboardType="phone-pad"
              />
              <ErrorText visible={touched.phone} text={errors.phone} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={fontColorWhite}
                onChangeText={handleChange('password')}
                secureTextEntry
                onBlur={() => setFieldTouched('password', true)}
              />
              <ErrorText visible={touched.password} text={errors.password} />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor={fontColorWhite}
                onChangeText={handleChange('confirmPassword')}
                secureTextEntry
                onBlur={() => setFieldTouched('confirmPassword', true)}
              />
              <ErrorText
                visible={touched.confirmPassword}
                text={errors.confirmPassword}
              />

              <RadioGroup
                radioButtons={genderRadioButton}
                onPress={setSelectedId}
                selectedId={selectedId}
                layout="row"
                containerStyle={styles.radioButton}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <Pressable
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}>
                <Text style={styles.buttonTextLogin}>Back to login</Text>
              </Pressable>
            </>
          )}
        </Formik>
        {loading && (
          <ActivityIndicator
            size={35}
            color={'dodgerblue'}
            style={styles.actIndicator}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: secondaryColor,
    borderRadius: 10,
    color: fontColorWhite,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 15,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  buttonTextLogin: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  radioButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderRadius: 5,
  },
  actIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height,
    width,
  },
});
