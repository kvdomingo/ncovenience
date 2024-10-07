import { MDBContainer as Container } from "mdbreact";

function Loading() {
  return (
    <Container className="my-5 mt-5 text-center" style={{ height: "50vh" }}>
      <div className="spinner-grow spinner-grow-lg d-inline-block my-5 mt-5" />
    </Container>
  );
}

export default Loading;
