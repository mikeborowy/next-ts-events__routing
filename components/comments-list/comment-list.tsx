import { CommentModel } from "../../models";
import classes from "./comment-list.module.css";

type CommentListProps = {
  comments: CommentModel[];
};

export function CommentList(props: CommentListProps) {
  const { comments } = props;
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => {
        return (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
