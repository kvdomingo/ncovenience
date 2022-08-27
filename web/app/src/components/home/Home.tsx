import Helmet from "react-helmet";
import { MDBCol as Col, MDBContainer as Container, MDBRow as Row } from "mdbreact";
import CounterPanels from "./CounterPanels";
import Map from "./Map";
import PlotPanels from "./PlotPanels";

function Home() {
  return (
    <>
      <Helmet>
        <title>Dashboard | NCOVENIENCE</title>
      </Helmet>
      <Row className="row-cols-1 row-cols-md-2">
        <Col>
          <Map />
        </Col>
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
