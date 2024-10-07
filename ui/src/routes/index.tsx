import Loading from "@/components/common/Loading";
import MapView from "@/components/map/Map";
import CounterPanels from "@/components/panels/CounterPanels.tsx";
import PlotPanels from "@/components/panels/PlotPanels.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { MDBCol as Col, MDBContainer as Container, MDBRow as Row } from "mdbreact";
import Helmet from "react-helmet";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { queryClient } = Route.useRouteContext();
  const loading = queryClient.isFetching({
    queryKey: ["provinces"],
  });

  return (
    <>
      <Helmet>
        <title>Dashboard | NCOVENIENCE</title>
      </Helmet>
      <Row className="row-cols-1 row-cols-md-2">
        <Col>{loading ? <Loading /> : <MapView />}</Col>
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
