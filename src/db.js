import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC01LuRUqfWK8tBvG8JeXlMATpm3IiPIx0',
  authDomain: 'bc-data-table.firebaseapp.com',
  databaseURL: 'https://bc-data-table.firebaseio.com',
  projectId: 'bc-data-table',
  storageBucket: 'bc-data-table.appspot.com',
  messagingSenderId: '125946695204',
};

export default firebase.initializeApp(config).firestore();
