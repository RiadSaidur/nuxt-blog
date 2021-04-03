export const validateNewPost = post => {
  const validatedPost =  {
    postData: {
      Title: post.Title.trim(),
      Place: post.Place.trim(),
      Body: post.Body.trim(),
      VisitDate: post.VisitDate
    },
    TitleImage: post.TitleImage,
  }

  return validatedPost
}