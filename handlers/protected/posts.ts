import { validateNewPost } from "@/validators/postValidators"
import { uploadTitleImage, createPostDoc, createCommentDoc, updatePostDoc, deletePostDocByID, deleteCommentsDocByID } from "@/helpers/posts"
import { POST } from "@/interface/types/post"

interface NEWPOST extends POST {
  author: string;
  TitleImage: File | undefined;
}

// create new blog post
export const newPost = async (post: NEWPOST) => {
  if(!post.author) return console.log('User not signed in')

  const postData = validateNewPost(post)

  // upload title image if available
  if(post.TitleImage) {
    const imageURL = await uploadTitleImage(postData.author, 'title', post.TitleImage)
    if(!imageURL) return false
    postData.TitleImage = imageURL
  }

  // create new post
  const postID = await createPostDoc(postData)
  if(!postID) return false

  // set up a comment box for this post
  await createCommentDoc(postID)

  return postID
}

// upload images of post body by text editor
export const savePostBodyImages = async (images: File[], author: string) => {
  const imageURLs = [] as string[]
  for(let idx = 0; idx < images.length; idx++) {
    const imageURL = await uploadTitleImage(author, 'post', images[idx])
    imageURLs.push(imageURL)
  }
  return imageURLs
}

// update blog post
export const updatePostByID = async (post: NEWPOST, postID: string) => {
  const currentUser = localStorage.username
  if(!currentUser) return console.log('User not signed in')
  if(currentUser != post.author) return console.log('User does not have access rights to the content')

  const postIDUpdated = await updatePostDoc(post, postID)
  if(!postIDUpdated) return false

  return postIDUpdated
}

export const deletePostByID = async (post: NEWPOST, postID: string) => {
  const currentUser = localStorage.username
  if(!currentUser) return console.log('User not signed in')
  if(currentUser != post.author) return console.log('User does not have access rights to the content')

  const isDeleted = await deletePostDocByID(postID)

  // delete comment collection for that post
  await deleteCommentsDocByID(postID)

  return isDeleted
}