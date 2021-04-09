import { COMMENT }  from '@/interface/types/comment'

export const validateNewComment = (comment: COMMENT) => {
  const validatedComment = {
    commentData: {
      body: comment.body.trim(),
      child: comment.childs,
    }
  }
  return validatedComment
}