import { useEffect, useState } from "react";
import { useNotificationContext } from "../../contexts/notification.context";
import { CommentModel } from "../../models";
import { CommentList } from "../comments-list";
import { NewComment } from "../new-comment";
import classes from "./comments.module.css";

type CommentsProps = {
  eventId: string;
};

export function Comments(props: CommentsProps) {
  const { eventId } = props;
  const { showNotification } = useNotificationContext();

  const [showComments, setShowComments] = useState(false);
  const [isFetchingCommentsComments, setIsFetchingCommentsComments] =
    useState(false);
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    if (showComments) {
      async () => {
        setIsFetchingCommentsComments(true);
        const response = await fetch(`/api/comments/${eventId}`);
        const jsonData = await response.json();

        setComments(jsonData.data);
        setIsFetchingCommentsComments(false);
      };
    }
  }, [showComments, eventId, showNotification]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus: boolean) => !prevStatus);
  }

  async function addCommentHandler(comment: CommentModel) {
    showNotification({
      status: "pending",
      title: "Sending comment!",
      message: "Adding comment, please blah blah...",
    });

    const response = await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      showNotification({
        status: "success",
        title: "Comment sent!",
        message: "Read blah blah...",
      });
    } else {
      showNotification({
        status: "error",
        title: "Comment sending failed!",
        message: "Read blah blah...",
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingCommentsComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingCommentsComments && (
        <progress>Loading...</progress>
      )}
    </section>
  );
}
