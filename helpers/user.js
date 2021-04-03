import { users } from '@/firebase/firebase'

export const createNewUser = async (uid, userInfo) => {
  try {
    await users.doc(uid).set(userInfo)
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