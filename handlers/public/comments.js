import { comments } from "@/firebase/firebase"

export const getCommentsByID = async postID => {
  try {
    const commentDoc = await comments.doc(postID).get()
    const commentList = commentDoc.data()
    return commentList.comments
  } catch (err) {
    console.log(err)
    return false
  }
}