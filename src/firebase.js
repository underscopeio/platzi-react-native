import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyD1l0Y2VrOh8MR2KsyM9T400xDg-qwf0YY",
  authDomain: "platzi-music.firebaseapp.com",
  databaseURL: "https://platzi-music.firebaseio.com",
  storageBucket: "platzi-music.appspot.com",
  messagingSenderId: "1085956110503"
}

firebase.initializeApp(config)

export const firebaseDatabase = firebase.database()
export const firebaseAuth = firebase.auth()

export default firebase
