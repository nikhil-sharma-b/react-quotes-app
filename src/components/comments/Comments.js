import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";

import styles from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = function () {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { qid } = useParams();
  let comments;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(qid);
  }, [qid, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(qid);
  }, [sendRequest, qid]);

  if (status === "pending") {
    comments = (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = (
      <p className="centered">
        No comments found! Be the first one to comment.
      </p>
    );
  }
  return (
    <section className={styles.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm qid={qid} onAddedComment={addedCommentHandler} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
