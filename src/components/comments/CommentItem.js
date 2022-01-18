import styles from "./CommentItem.module.css";

const CommentItem = function ({ text }) {
  return (
    <li className={styles.item}>
      <p>{text}</p>
    </li>
  );
};

export default CommentItem;
