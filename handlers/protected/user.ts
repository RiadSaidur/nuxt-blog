import { currentUser, currentUserUid } from "@/firebase/firebase"
import { updateUser } from "@/helpers/user"
import { USER } from "@/interface/types/user"

export const updateUserProfile = async (userInfo: USER) => {
  try {
    const user = currentUser()
    if(!user) return console.log('User not signed in')

    const uid = currentUserUid() || ''
    return await updateUser(uid, userInfo)
  } catch (err) {
    console.log(err)
    return false
  }
}