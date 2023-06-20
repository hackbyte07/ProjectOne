import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { err } from 'react-native-svg/lib/typescript/xml';

type userType = {
  name: string;
  email: string;
  phoneNumber: number;
  movies: {};
};

const userCollections = firestore().collection('users');

const createUser = async (name: string, email: string, phoneNumber: number) => {
  try {
    await userCollections.doc(email).set({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      movies: {},
    });
    console.log('userAdded and created');
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (name: string, phoneNumber: string, email: string) => {
  try {
   await  userCollections.doc(email).update({
    name,
    phoneNumber,
    email,
  });
  } catch (error) {
    console.log(error)
  }
 
};

export {createUser, userCollections, editUser};
export type {userType};
