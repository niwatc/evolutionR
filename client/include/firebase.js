import firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyA-S8iI7eiEFgChxXlMEYi7LcAzO94sVI8',
  authDomain: 'graphdb-f8314.firebaseapp.com',
  databaseURL: 'https://graphdb-f8314.firebaseio.com',
  projectId: 'graphdb-f8314',
  storageBucket: 'graphdb-f8314.appspot.com',
  messagingSenderId: '149737911600'
}

var Firebase = firebase.initializeApp(firebaseConfig)

module.exports = Firebase
