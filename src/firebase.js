import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCrNKZFhNIOLOr6a4hmXRCL6gJZi5F-Tt0",
  authDomain: "platzimusic.firebaseapp.com",
  databaseURL: "https://platzimusic.firebaseio.com",
  storageBucket: "platzimusic.appspot.com",
  messagingSenderId: "383576358540"
}

firebase.initializeApp(config)

export const firebaseDatabase = firebase.database()
export const firebaseAuth = firebase.auth()

export default firebase
