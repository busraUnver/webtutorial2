import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDMyfErURClky958IDtMeENmuRqGpBJcFQ",
    authDomain: "cs458-p1.firebaseapp.com",
    projectId: "cs458-p1",
    storageBucket: "cs458-p1.appspot.com",
    messagingSenderId: "508022139289",
    appId: "1:508022139289:web:4f9c08a81a718e76320b08",
    measurementId: "G-2S1ZKSPGW4",
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
    }
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  }

  export default Firebase;