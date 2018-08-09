var firebase = require('firebase');
require('@firebase/firestore');

const config = {
  apiKey: "AIzaSyAdJduv0cb2LOwzTo_QY24p2O4OiFY97SE",
  authDomain: "todo-67dd3.firebaseapp.com",
  databaseURL: "https://todo-67dd3.firebaseio.com",
  projectId: "todo-67dd3",
  storageBucket: "todo-67dd3.appspot.com",
  messagingSenderId: "8791448380"
}



let instance = null;

class FirebaseService {
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(config);
      instance = this;
      const settings = {timestampsInSnapshots: true};
      firebase.firestore().settings(settings);
    }
    return instance;
  }
}

const firebaseService = new FirebaseService().app;
export default firebaseService;

/*
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBx0YuFCeqedFUGgpmdZOr7T7wGzy9N8Qo",
  authDomain: "pulso-3f393.firebaseapp.com",
  databaseURL: "https://pulso-3f393.firebaseio.com",
  projectId: "pulso-3f393",
  storageBucket: "pulso-3f393.appspot.com",
  messagingSenderId: "677974717412"
};
firebase.initializeApp(config);

export default firebase;
*/
