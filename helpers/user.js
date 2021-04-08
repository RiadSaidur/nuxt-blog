import { users } from '@/firebase/firebase'

const userExists = async username => {
  try {
    const exsistingUser = await users.where("username", "==", username).limit(1).get()
    return exsistingUser.docs[0]?.exists ? true : false
  } catch (err) {
    console.log(err)
  }
}

export const createNewUser = async (uid, userInfo) => {
  try {
    await users.doc(uid).set(userInfo)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const updateUser =  async (uid, userInfo) => {
  try {
    const exsistingUser = await userExists(userInfo.username)
    if (exsistingUser) return false
    // update prfile if no other user is using the same username
    await users.doc(uid).update({ displayName: userInfo.displayName, username: userInfo.username })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getUserByUid = async uid => {
  try {
    const userDoc = await users.doc(uid).get()
    const user = userDoc.data()
    return user
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getUserByEmail = async email => {
  try {
    const userDoc = await users.where("email", "==", email).limit(1).get()
    const user = userDoc.docs[0].data()
    return user
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getUserByUsername = async username => {
  try {
    const userDoc = await users.where("username", "==", username).limit(1).get()
    const user = userDoc.docs[0].data()
    return user
  } catch (err) {
    console.log(err)
    return false
  }
}