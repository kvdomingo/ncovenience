import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/shared/Footer";
import Loading from "./components/shared/Loading";
import GAUtil from "./components/utils/GAUtil";

const Home = lazy(() => import("./components/home/Home"));
const Docs = lazy(() => import("./components/docs/Docs"));
const Err404 = lazy(() => import("./components/shared/NotFound"));

function App() {
  return (
    <Router>
      <GAUtil />
      {/*<Navbar />*/}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route element={<Err404 />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
