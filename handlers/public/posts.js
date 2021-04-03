import { posts } from "@/firebase/firebase"

export const getAllPosts = async () => {
  try {
    const postDocs = await posts.orderBy('createdAt', 'desc').get()
    let postDatas = []
    postDocs.forEach(doc => {
      const post = {
        postID: doc.id,
        ...doc.data()
      }
      postDatas.push(post)
    })
    return postDatas
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getPostByID = async id => {
  try {
    const postDoc = await posts.doc(id).get()
    const postData = postDoc.data()
    return postData
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getPostByUser = async user => {
  try {
    const postDocs = await posts.where("author", "==", user).orderBy("createdAt", "desc").get()
    const postDatas = []
    postDocs.forEach(doc => {
      const post = {
        postID: doc.id,
        ...doc.data()
      }
      postDatas.push(post)
    })
    return postDatas
  } catch (err) {
    console.log(err)
    return false
  }
}