import Helmet from "react-helmet";
import { MDBCol as Col, MDBContainer as Container, MDBRow as Row, MDBTypography as Type } from "mdbreact";
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
            <Type tag="h1" variant="display-4" className="my-4 text-left">
              Dashboard
            </Type>
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
