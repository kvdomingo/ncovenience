import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactGA from "react-ga";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Loading from "./components/shared/Loading";
import Routes from "./Routes";
import "./App.css";

const { NODE_ENV } = process.env;

export default function App() {
  useEffect(() => {
    if (NODE_ENV === "production") {
      ReactGA.initialize("UA-162676656-1");
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loading />}>{Routes}</Suspense>
      <Footer />
    </Router>
  );
}
