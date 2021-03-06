import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

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

const AllQuotes = function () {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
