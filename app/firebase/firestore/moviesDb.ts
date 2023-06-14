
import {userCollections} from './usersDb';
import {MoviesResult} from '../../redux/slice/moviesSlice/moviesRequests';
import auth from '@react-native-firebase/auth';

const moviesCollection = userCollections
  .doc(auth().currentUser?.email?.toString())
  .collection('movies');

const addMoviesToFavorite = async (movie: MoviesResult) => {
  try {
    const moviesList = await moviesCollection
      .doc(movie.id.toString())
      .set(movie);
    console.log('movies list added');
    return moviesList;
  } catch (error) {}
};

const deleteFromFavorite = async (movieId: number)  => {
    try {
        await moviesCollection.doc(movieId.toString()).delete()
        console.log('movie deleted successfully')
    } catch (error) {
        console.log('error')
    }
}

export {addMoviesToFavorite, deleteFromFavorite,moviesCollection};
