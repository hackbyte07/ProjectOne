import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useEffect} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import ErrorText from '../../components/ErrorText';
import {RootScreens} from '../../navigation/RootNavigation';
import {
  backgroundColor,
  fontColorWhite,
  secondaryColor,
} from '../../assets/colors/colors';
import {loginAccountWithEmail} from '../../firebase/auth/emailAuth';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {onGoogleButtonPress} from '../../firebase/auth/googleAuth';
import {useState} from 'react';
import ScreenLoadingComponent from '../../components/ScreenLoadingComponent';
import LinearGradient from 'react-native-linear-gradient';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  const progress = useSharedValue(0);

  const imageAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(progress.value),
      transform: [{scale: withSpring(progress.value)}],
    };
  });

  useEffect(() => {
    progress.value = 1;
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.bg}
        colors={backgroundColor}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Animated.Image
          source={require('../../assets/images/appLogo.png')}
          style={[styles.image, imageAnimStyle]}
        />
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={value => {
            setLoading(true);
            loginAccountWithEmail(value.email, value.password)
              .then(login => {
                setLoading(false);
                if (login) {
                  navigation.replace('BottomTabBarScreen');
                  console.log('Successful Login');
                } else {
                  Alert.alert('Failed', 'Login Failed');
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
            isValid,
            isSubmitting,
          }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={fontColorWhite}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                onBlur={() => setFieldTouched('email', true)}
              />
              <ErrorText visible={touched.email} text={errors.email} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={fontColorWhite}
                onChangeText={handleChange('password')}
                secureTextEntry
                onBlur={() => setFieldTouched('password', true)}
              />
              <ErrorText visible={touched.password} text={errors.password} />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <Pressable
                onPress={() => {
                  navigation.navigate('SignupScreen');
                }}>
                <Text style={styles.buttonTextRegister}>
                  New Here? Register
                </Text>
              </Pressable>
            </>
          )}
        </Formik>

        <Text style={styles.text}>Or</Text>

        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() =>
            onGoogleButtonPress().then(result =>
              console.log(result?.user.email),
            )
          }
          style={styles.googleSignIn}
        />
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
   
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginBottom: 50,
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
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  buttonTextRegister: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  googleSignIn: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
    color: fontColorWhite,
    fontWeight: 'bold',
    marginVertical: 5,
    
  },
  actIndicator: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
