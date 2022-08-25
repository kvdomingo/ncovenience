import { MDBContainer as Container } from "mdbreact";

function Loading() {
  return (
    <Container className="text-center my-5 mt-5" style={{ height: "50vh" }}>
      <div className="my-5 mt-5 spinner-grow spinner-grow-lg d-inline-block" />
    </Container>
  );
}

export default Loading;
