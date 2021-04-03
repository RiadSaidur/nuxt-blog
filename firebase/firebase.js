import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"

import { firebaseConfig } from "@/config/firebaseConfig"

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  console.log(firebaseConfig)
}else {
  // if already initialized, use that one
  firebase.app()
  console.log('ssr', firebaseConfig);
}

export const firestore = firebase.firestore

const auth = firebase.auth()
export const currentUser = () => auth.currentUser?.email

const db = firebase.firestore()
export const posts = db.collection("posts")
export const comments = db.collection("comments")
export const users = db.collection("users")

const storage = firebase.storage()
export const titleImage = storage.ref()
