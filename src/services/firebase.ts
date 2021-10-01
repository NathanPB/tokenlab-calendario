import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = firebase.auth()
export const db = firebase.firestore()

export async function registerWithEmailPwd(name: string, email: string, pwd: string) {
  const { user } = await auth.createUserWithEmailAndPassword(email, pwd)
  await db.doc(`users/${user?.uid}`)
    .set({ auth: 'local', name, email })
}
