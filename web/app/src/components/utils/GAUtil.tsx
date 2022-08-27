import { useEffect } from "react";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

const { NODE_ENV } = process.env;

function GAUtil() {
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

  return null;
}

export default GAUtil;
