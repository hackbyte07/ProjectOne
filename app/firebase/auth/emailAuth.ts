import auth from '@react-native-firebase/auth';

const createAccountWithEmail: (
  email: string,
  password: string,
) => Promise<boolean> = async (email: string, password: string) => {
  try {
    const request = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    await request.user.sendEmailVerification();
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};

const loginAccountWithEmail: (
  email: string,
  password: string,
) => Promise<boolean> = async (email: string, password: string) => {
  try {
    const request = await auth().signInWithEmailAndPassword(email, password);
    return request.user.emailVerified;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export {createAccountWithEmail, loginAccountWithEmail};
