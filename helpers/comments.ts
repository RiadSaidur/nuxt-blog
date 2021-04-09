import { firestore, currentUser, comments } from "@/firebase/firebase"
import { COMMENT } from "@/interface/types/comment"

export const deleteComment = async (comment: COMMENT, postID: string) => {
  try {
    await comments.doc(postID).update({ comments: firestore.FieldValue.arrayRemove(comment) })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const addNewComment = async (comment: COMMENT, postID: string) => {
  try {
    comment.createdAt = new Date().toLocaleString()
    await comments.doc(postID).update({ comments: firestore.FieldValue.arrayUnion(comment) })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}