import { Link } from "react-router-dom";
import styles from "./QuoteItem.module.css";

const QuoteItem = function ({ text, author, id }) {
  return (
    <li className={styles.item}>
      <figure>
        <blockquote>
          <p>{text}</p>
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>
      <Link to={`/quotes/${id}`} className="btn">
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
