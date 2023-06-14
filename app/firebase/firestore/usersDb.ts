import firestore from '@react-native-firebase/firestore';

const userCollections = firestore().collection('users');

const createUser = async (name: string, email: string) => {
  try {
    await userCollections.doc(email).set({
      name: name,
      email: email,
      movies: {},
    });
    console.log('userAdded and created');
  } catch (error) {
    console.log(error);
  }
};




export {
  createUser,
  userCollections
}