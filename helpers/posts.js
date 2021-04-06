import { posts, titleImage, comments } from "@/firebase/firebase"

export const createCommentDoc = async postID => {
  try {
    await comments.doc(postID).set({ comments: [] })
  } catch (err) {
    console.log(err)
    return false
  }
}

export const uploadTitleImage = async (author, TitleImage) => {
  try {
    await titleImage.child(`${author}/${TitleImage.name}`).put(TitleImage)
    const imageURL = `https://firebasestorage.googleapis.com/v0/b/nuxt-blog-syds.appspot.com/o/${encodeURI(author)}%2F${TitleImage.name}?alt=media`
    return imageURL
  } catch (err) {
    console.log(err)
    return false
  }
}

export const createPostDoc = async (author, postData) => {
  try {
    postData.author = author
    postData.createdAt = new Date().toLocaleString()
    const res = await posts.add(postData)
    return res.id
  } catch (err) {
    console.log(err)
    return false
  }
}

export const updatePostDoc = async (post, postID) => {
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

export const deletePostDocByID = async postID => {
  try {
    await posts.doc(postID).delete()
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const deleteCommentsDocByID = async postID => {
  try {
    await comments.doc(postID).delete()
  } catch (err) {
    console.log(err)
    return false
  }
}