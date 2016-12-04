import * as firebase from 'firebase';
import config from '../../common/config';

const firebaseApp = firebase.initializeApp(config.firebase);
export const firebaseDb = firebaseApp.database().ref();
export const firebaseAuth = firebaseApp.auth();
