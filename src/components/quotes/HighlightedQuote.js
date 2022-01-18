import styles from "./HighlightedQuote.module.css";

const HighlightedQuote = function ({ text, author }) {
  return (
    <figure className={styles.quote}>
      <p>{text}</p>
      <figcaption>{author}</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
