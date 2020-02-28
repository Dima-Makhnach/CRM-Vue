import firebase from 'firebase'

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'vue-crm-272be.firebaseapp.com',
  databaseURL: 'https://vue-crm-272be.firebaseio.com',
  projectId: 'vue-crm-272be',
  storageBucket: 'vue-crm-272be.appspot.com',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
})

const auth = firebase.auth()
const db = firebase.database()

export {
  auth,
  db
}
