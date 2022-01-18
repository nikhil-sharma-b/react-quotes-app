// Library imports
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";

// Component imports
// import NewQuote from "./pages/NewQuote";
// import AllQuotes from "./pages/AllQuotes";
// import QuoteDetail from "./pages/QuoteDetail";
// import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// Lazy-loading
// React.lazy() -> built-in function that helps in code splitting
// Is executed only when the component is needed => this create a seperate chunk of code
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = function () {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="quotes" />} />
          <Route path="quotes" element={<AllQuotes />} />
          <Route path="quotes/:qid/*" element={<QuoteDetail />} />
          <Route path="new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
