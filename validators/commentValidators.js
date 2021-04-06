export const validateNewComment = comment => {
  const validatedComment = {
    commentData: {
      body: comment.body.trim(),
      child: comment.child,
    }
  }
  return validatedComment
}