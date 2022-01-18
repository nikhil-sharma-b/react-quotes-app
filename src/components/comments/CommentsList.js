import CommentItem from "./CommentItem";
import styles from "./CommentsList.module.css";

const CommentsList = function ({ comments }) {
  return (
    <ul className={styles.comments}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentsList;
