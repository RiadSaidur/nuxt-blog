import { posts } from "@/firebase/firebase"
import { POST } from "@/interface/types/post"

interface PostData extends POST {
  postID: string;
}

export const getAllPosts = async () => {
  try {
    const postDocs = await posts.orderBy('createdAt', 'desc').get()
    let postDatas: PostData[] = []
    postDocs.forEach(doc => {
      const data = doc.data()
      const post = {
        postID: doc.id,
        Body: data.Body,
        Place: data.Place,
        Title: data.Title,
        VisitDate: data.VisitDate,
        TitleImage: data?.TitleImage,
        author: data.author,
        createdAt: data.createdAt,
        updatedAt: data?.updatedAt,
        likes: data?.likes
      }
      postDatas.push(post)
    })
    return postDatas
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getPostByID = async (id: string) => {
  try {
    const postDoc = await posts.doc(id).get()
    const postData = postDoc.data()
    return postData
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getPostByUser = async (username: string) => {
  try {
    const postDocs = await posts.where("author", "==", username).orderBy("createdAt", "desc").get()
    let postDatas: PostData[] = []
    postDocs.forEach(doc => {
      const data = doc.data()
      const post = {
        postID: doc.id,
        Body: data.Body,
        Place: data.Place,
        Title: data.Title,
        VisitDate: data.VisitDate,
        TitleImage: data?.TitleImage,
        author: data.author,
        createdAt: data.createdAt,
        updatedAt: data?.updatedAt,
        likes: data?.push
      }
      postDatas.push(post)
    })
    return postDatas
  } catch (err) {
    console.log(err)
    return false
  }
}