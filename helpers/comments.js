import { firestore, currentUser, comments } from "@/firebase/firebase"

export const deleteComment = async (comment, postID) => {
  try {
    await comments.doc(postID).update({ comments: firestore.FieldValue.arrayRemove(comment) })
    return true
  } catch (err) {
    console.log(res)
    return false
  }
}

export const addNewComment = async (comment, postID) => {
  try {
    comment.createdAt = new Date().toLocaleString()
    await comments.doc(postID).update({ comments: firestore.FieldValue.arrayUnion(comment) })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}