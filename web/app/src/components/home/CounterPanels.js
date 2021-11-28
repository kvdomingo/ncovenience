import React from "react";
import {
  MDBRow as Row,
  MDBCol as Col,
  MDBTypography as Type,
  MDBCard as Card,
  MDBCardHeader as CardHeader,
  MDBCardBody as CardBody,
  MDBCardFooter as CardFooter,
  MDBIcon as Icon,
} from "mdbreact";
import Loading from "../shared/Loading";
import api from "../../utils/Endpoints";

function numberWithCommas(num) {
  if (typeof num !== "undefined") {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default class CounterPanels extends React.Component {
  state = {
    loading: true,
    numbers: "",
    delta: "",
  };

  componentDidMount() {
    api.data
      .numbers()
      .then(res => this.setState({ numbers: res.data }))
      .catch(err => console.error(err.message));

    api.data
      .counts()
      .then(res => this.setState({ delta: res.data, loading: false }))
      .catch(err => console.error(err.message));
  }

  render() {
    let panelContents = [
      { color: "warning", label: "confirmed", icon: "users" },
      { color: "primary", label: "active", icon: "stethoscope" },
      { color: "success", label: "recovered", icon: "first-aid" },
      { color: "danger", label: "deceased", icon: "skull-crossbones" },
    ];

    if (this.state.loading) return <Loading />;
    else
      return (
        <Row className="row-cols-2 mt-4 mb-2">
          {panelContents.map(({ color, label, icon }, i) => (
            <Col className="mx-0 px-2" key={i}>
              <Card className="mb-3">
                <CardHeader className="text-muted text-left" style={{ fontVariant: "small-caps" }}>
                  <Icon fas icon={icon} /> {label}
                </CardHeader>
                <CardBody className={`text-center text-${this.state.numbers[label] === 0 ? "muted" : color}`}>
                  <Type tag="h3" variant="h1-responsive">
                    {numberWithCommas(this.state.numbers[label])}
                  </Type>
                </CardBody>
                {(() => {
                  if (this.state.delta[label] >= 0) {
                    return (
                      <CardFooter className={`text-right text-${label === "recovered" ? "success" : "danger"}`}>
                        <small>
                          +{this.state.delta[label]} (+
                          {((this.state.delta[label] / this.state.numbers[label]) * 100).toFixed(2)})
                        </small>
                      </CardFooter>
                    );
                  } else {
                    return (
                      <CardFooter className={`text-right text-${label === "recovered" ? "danger" : "success"}`}>
                        <small>
                          {this.state.delta[label]} (
                          {((this.state.delta[label] / this.state.numbers[label]) * 100).toFixed(2)})
                        </small>
                      </CardFooter>
                    );
                  }
                })()}
              </Card>
            </Col>
          ))}
        </Row>
      );
  }
}
