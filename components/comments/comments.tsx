import { useEffect, useState } from "react";
import { CommentModel } from "../../models";
import { CommentList } from "../comments-list";
import { NewComment } from "../new-comment";
import classes from "./comments.module.css";

type CommentsProps = {
  eventId: string;
};

export function Comments(props: CommentsProps) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    if (showComments) {
      (async () => {
        const response = await fetch(`/api/comments/${eventId}`);
        const jsonData = await response.json();

        setComments(jsonData.data);
      })();
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus: boolean) => !prevStatus);
  }

  async function addCommentHandler(comment: CommentModel) {
    await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}
