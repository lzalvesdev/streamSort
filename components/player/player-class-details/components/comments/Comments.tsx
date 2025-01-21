import ICommentProps, { Comment } from "./Comment"

interface CommentsProps {
  comments: ICommentProps[];
}

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <div >
      {comments.map(comment => (
        <Comment key={comment.publishDate} {...comment} />
      ))}
    </div>
  )
}