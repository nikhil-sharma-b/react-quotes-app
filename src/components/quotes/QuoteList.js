import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router";

import QuoteItem from "./QuoteItem";
import styles from "./QuoteList.module.css";

// Ascending and Descending logic
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = function ({ quotes }) {
  const navigate = useNavigate();
  const location = useLocation();

  // A JS constructor object that allows you to get the url parameters
  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(quotes, isSortingAscending);

  const changeSortingHandler = () => {
    navigate(`?sort=${isSortingAscending ? "desc" : "asc"}`);
  };

  return (
    <Fragment>
      <div className={styles.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}{" "}
        </button>
      </div>
      <ul className={styles.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
