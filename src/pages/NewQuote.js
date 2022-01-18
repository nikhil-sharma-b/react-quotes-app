import { useEffect } from "react";
import { useNavigate } from "react-router";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = function () {
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") navigate("/quotes");
  }, [status, navigate]);

  const addQuoteHanlder = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHanlder} />
  );
};

export default NewQuote;
