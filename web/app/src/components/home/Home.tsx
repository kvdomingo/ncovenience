import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { MDBCol as Col, MDBContainer as Container, MDBRow as Row } from "mdbreact";
import api from "../../api";
import Loading from "../shared/Loading";
import CounterPanels from "./CounterPanels";
import Map from "./Map";
import PlotPanels from "./PlotPanels";

function Home() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.data
      .token()
      .then(res => setToken(res.data.token))
      .catch(err => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard | NCOVENIENCE</title>
      </Helmet>
      <Row className="row-cols-1 row-cols-md-2">
        <Col>{loading ? <Loading /> : <Map token={token} />}</Col>
        <Col>
          <Container className="my-4">
            <div className="text-center">
              <CounterPanels />
              <PlotPanels />
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default Home;
