import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"

import nuxtConfig from '@/nuxt.config'

if (!firebase.apps.length) {
  firebase.initializeApp(nuxtConfig.firebase.config)
}else {
  // if already initialized, use that one
  firebase.app()
}

export const firestore = firebase.firestore

const auth = firebase.auth()
export const currentUser = () => auth.currentUser?.email
export const currentUserUid = () => auth.currentUser?.uid

const db = firebase.firestore()
export const posts = db.collection("posts")
export const comments = db.collection("comments")
export const users = db.collection("users")

const storage = firebase.storage()
export const titleImage = storage.ref()
