import { currentUser } from "@/firebase/firebase"
import { validateNewComment } from "@/validators/commentValidators"
import { addNewComment, deleteComment } from "@/helpers/comments"

export const newComment = async (comment, postID) => {
  const author = currentUser()
  if(!author) return console.log('User not signed in')

  const { commentData } = validateNewComment(comment)
  if(!commentData.body) return false

  comment.author = author
  
  return await addNewComment(comment, postID)
}

export const removeComment = async (comment, postID) => {
  const authnticatedUser = currentUser()
  if(!authnticatedUser) return console.log('User not signed in')
  if(authnticatedUser != comment.author) return console.log('User does not have access rights to the content')

  return await deleteComment(comment, postID)
}