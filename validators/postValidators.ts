import { POST } from "@/interface/types/post"

interface NEWPOST extends POST {
  author: string;
}

export const validateNewPost = (post: NEWPOST) => {
  const validatedPost =  {
    Title: post.Title.trim(),
    Place: post.Place.trim(),
    Body: post.Body.trim(),
    VisitDate: post.VisitDate,
    author: post.author,
    TitleImage: '',
    likes: []
  }

  return validatedPost
}