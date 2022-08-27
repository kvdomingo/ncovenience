import { useEffect, useState } from "react";
import {
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardFooter as CardFooter,
  MDBCardHeader as CardHeader,
  MDBCol as Col,
  MDBIcon as Icon,
  MDBRow as Row,
  MDBTypography as Type,
} from "mdbreact";
import api from "../../api";
import Loading from "../shared/Loading";

function numberWithCommas(num: number) {
  if (typeof num !== "undefined") {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

function CounterPanels() {
  const [loading, setLoading] = useState(true);
  const [numbers, setNumbers] = useState<any>("");
  const [delta, setDelta] = useState<any>("");

  useEffect(() => {
    Promise.all([api.data.numbers(), api.data.counts()])
      .then(([resNumbers, resCounts]) => {
        setNumbers(resNumbers.data);
        setDelta(resCounts.data);
      })
      .catch(err => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  let panelContents = [
    { color: "warning", label: "confirmed", icon: "users" },
    { color: "primary", label: "active", icon: "stethoscope" },
    { color: "success", label: "recovered", icon: "first-aid" },
    { color: "danger", label: "deceased", icon: "skull-crossbones" },
  ];

  return loading ? (
    <Loading />
  ) : (
    <Row className="row-cols-2 mt-4 mb-2">
      {panelContents.map(({ color, label, icon }, i) => (
        <Col className="mx-0 px-2" key={i}>
          <Card className="mb-3">
            <CardHeader className="text-muted text-left" style={{ fontVariant: "small-caps" }}>
              <Icon fas icon={icon} /> {label}
            </CardHeader>
            <CardBody className={`text-center text-${numbers[label] === 0 ? "muted" : color}`}>
              <Type tag="h3" variant="h1-responsive">
                {numberWithCommas(numbers[label])}
              </Type>
            </CardBody>
            {(() => {
              if (delta[label] >= 0) {
                return (
                  <CardFooter className={`text-right text-${label === "recovered" ? "success" : "danger"}`}>
                    <small>
                      +{delta[label]} (+
                      {((delta[label] / numbers[label]) * 100).toFixed(2)})
                    </small>
                  </CardFooter>
                );
              } else {
                return (
                  <CardFooter className={`text-right text-${label === "recovered" ? "danger" : "success"}`}>
                    <small>
                      {delta[label]} ({((delta[label] / numbers[label]) * 100).toFixed(2)})
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

export default CounterPanels;
