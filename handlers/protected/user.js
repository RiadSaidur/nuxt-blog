import { currentUser, currentUserUid } from "@/firebase/firebase"
import { updateUser } from "@/helpers/user"

export const updateUserProfile = async (userInfo) => {
  try {
    const user = currentUser()
    if(!user) return console.log('User not signed in')

    const uid = currentUserUid()
    return await updateUser(uid, userInfo)
  } catch (err) {
    console.log(err)
    return false
  }
}