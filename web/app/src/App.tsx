import { Suspense, useEffect } from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import Footer from "./components/shared/Footer";
import Loading from "./components/shared/Loading";
import Navbar from "./components/shared/Navbar";

const { NODE_ENV } = process.env;

function App() {
  const location = useLocation();

  useEffect(() => {
    if (NODE_ENV === "production") {
      ReactGA.initialize("UA-162676656-1");
    }
  }, []);

  useEffect(() => {
    if (NODE_ENV === "production") {
      ReactGA.pageview(`${location.pathname}${location.search}`);
    }
  }, [location.pathname, location.search]);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loading />}>{Routes}</Suspense>
      <Footer />
    </Router>
  );
}

export default App;
