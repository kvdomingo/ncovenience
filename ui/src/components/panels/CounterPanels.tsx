import { api } from "@/api";
import Loading from "@/components/common/Loading";
import { useQuery } from "@tanstack/react-query";
import {
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardFooter as CardFooter,
  MDBCardHeader as CardHeader,
  MDBCol as Col,
  MDBIcon as Icon,
  MDBRow as Row,
  MDBTypography as Typography,
} from "mdbreact";

function CounterPanels() {
  const numbersQuery = useQuery({
    queryKey: ["numbers"],
    queryFn: api.data.numbers,
  });
  const numbers = numbersQuery.data?.data ?? {};

  const countsQuery = useQuery({
    queryKey: ["counts"],
    queryFn: api.data.counts,
  });
  const delta = countsQuery.data?.data ?? {};

  const panelContents = [
    { color: "warning", label: "confirmed", icon: "users" },
    { color: "primary", label: "active", icon: "stethoscope" },
    { color: "success", label: "recovered", icon: "first-aid" },
    { color: "danger", label: "deceased", icon: "skull-crossbones" },
  ];

  const loading = numbersQuery.isLoading || countsQuery.isLoading;

  return loading ? (
    <Loading />
  ) : (
    <Row className="row-cols-2 mt-4 mb-2">
      {panelContents.map(({ color, label, icon }) => (
        <Col className="mx-0 px-2" key={label}>
          <Card className="mb-3">
            <CardHeader
              className="text-left text-muted"
              style={{ fontVariant: "small-caps" }}
            >
              <Icon fas icon={icon} /> {label}
            </CardHeader>
            <CardBody
              className={`text-center text-${numbers[label] === 0 ? "muted" : color}`}
            >
              {/* @ts-ignore */}
              <Typography tag="h3" variant="h1-responsive">
                {numbers[label]?.toLocaleString()}
              </Typography>
            </CardBody>
            {(() => {
              if (delta[label] >= 0) {
                return (
                  <CardFooter
                    className={`text-right text-${label === "recovered" ? "success" : "danger"}`}
                  >
                    <small>
                      +{delta[label]} (+
                      {((delta[label] / (numbers[label] || 1)) * 100).toFixed(2)})
                    </small>
                  </CardFooter>
                );
              }
              return (
                <CardFooter
                  className={`text-right text-${label === "recovered" ? "danger" : "success"}`}
                >
                  <small>
                    {delta[label]} ({((delta[label] / numbers[label]) * 100).toFixed(2)}
                    )
                  </small>
                </CardFooter>
              );
            })()}
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CounterPanels;
