import { posts, titleImage, comments } from "@/firebase/firebase"
import { POST } from "@/interface/types/post"

interface NEWPOST extends POST {
  author: string;
}

export const createCommentDoc = async (postID: string) => {
  try {
    await comments.doc(postID).set({ comments: [] })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const uploadTitleImage = async (author: string, TitleImage: File) => {
  try {
    await titleImage.child(`${author}/${TitleImage.name}`).put(TitleImage)
    const imageURL = `https://firebasestorage.googleapis.com/v0/b/travelersofbanagladesh.appspot.com/o/${encodeURI(author)}%2F${TitleImage.name}?alt=media`
    return imageURL
  } catch (err) {
    console.log(err)
    return false
  }
}

export const createPostDoc = async (postData: POST) => {
  try {
    postData.createdAt = new Date().toLocaleString()
    const res = await posts.add(postData)
    return res.id
  } catch (err) {
    console.log(err)
    return false
  }
}

export const updatePostDoc = async (post: POST, postID: string) => {
  try {
    await posts.doc(postID).update({
      Title: post.Title,
      VisitDate: post.VisitDate,
      Body: post.Body,
      Place: post.Place,
      updatedAt: new Date().toLocaleString()
    })
    return postID
  } catch (err) {
    console.log(err)
    return false
  }
}

export const deletePostDocByID = async (postID: string) => {
  try {
    await posts.doc(postID).delete()
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const deleteCommentsDocByID = async (postID: string) => {
  try {
    await comments.doc(postID).delete()
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}