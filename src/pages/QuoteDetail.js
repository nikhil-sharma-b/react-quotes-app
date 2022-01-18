import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router";
import { Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

// const DUMMY_QUOTES = [
//   {
//     id: "q1",
//     author: "Ken Kaneki",
//     text: "It is better to be hurt than to hurt others. Nice people can be happy with just that.",
//   },
//   {
//     id: "q2",
//     author: "Imagine Dragons",
//     text: "Stars only visit during darkness...",
//   },
//   {
//     id: "q3",
//     author: "Niklaus Mikaelson",
//     text: "...in the end we are left infinitely and utterly alone",
//   },
// ];

const QuoteDetail = function () {
  const { qid } = useParams();
  // const quote = DUMMY_QUOTES.find((quote) => quote.id === qid);

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(qid);
  }, [sendRequest, qid]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) return <p className="centered">Quote not found!</p>;

  return (
    <div>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="centered">
              <Link className="btn--flat" to="comments">
                Load Comments
              </Link>
            </div>
          }
        />
        <Route path="comments" element={<Comments />} />
      </Routes>
    </div>
  );
};

export default QuoteDetail;
