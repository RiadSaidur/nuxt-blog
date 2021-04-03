import { currentUser } from "@/firebase/firebase"
import { validateNewPost } from "@/validators/postValidators"
import { uploadTitleImage, createPostDoc, createCommentDoc, updatePostDoc, deletePostDocByID, deleteCommentsDocByID } from "@/helpers/posts"

// create new blog post
export const newPost = async post => {
  const author = currentUser()
  if(!author) return console.log('User not signed in')

  const { postData, TitleImage } = validateNewPost(post)

  // upload title image if available
  if(TitleImage) {
    const imageURL = await uploadTitleImage(author, TitleImage)
    if(!imageURL) return false
    postData.TitleImage = imageURL
  }

  // create new post
  const postID = await createPostDoc(author, postData)
  if(!postID) return false

  // set up a comment box for this post
  await createCommentDoc(postID)

  return postID
}

// update blog post
export const updatePostByID = async (post, postID) => {
  const author = currentUser()
  if(!author) return console.log('User not signed in')
  if(author != post.author) return console.log('User does not have access rights to the content')

  const postIDUpdated = await updatePostDoc(post, postID)
  if(!postIDUpdated) return false

  return postIDUpdated
}

export const deletePostByID = async (post, postID) => {
  const author = currentUser()
  if(!author) return console.log('User not signed in')
  if(author != post.author) return console.log('User does not have access rights to the content')

  const isDeleted = await deletePostDocByID(postID)

  // delete comment collection for that post
  await deleteCommentsDocByID(postID)

  return isDeleted
}