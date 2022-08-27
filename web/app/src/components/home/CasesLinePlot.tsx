import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { MDBCard as Card, MDBCardBody as CardBody, MDBCardHeader as CardHeader } from "mdbreact";
import moment from "moment";
import api from "../../api";
import Loading from "../shared/Loading";

interface CasesLinePlotProps {
  endpoint: string;
  cardTitle: string;
  xLabel: string;
  yLabel: string;
}

function CasesLinePlot({ endpoint, cardTitle, xLabel, yLabel }: CasesLinePlotProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let ep = () => {
      if (endpoint) {
        switch (endpoint) {
          case "time-plot":
            return api.data.timePlot();
          case "delta-plot":
            return api.data.deltaPlot();
          case "world-plot":
            return api.data.worldPlot();
        }
      }
    };

    if (ep) {
      ep()!
        .then(res => {
          let dataStyle = {
            fill: false,
            pointRadius: 1,
            pointHoverRadius: 10,
          };
          res.data.datasets.forEach((category: any, i: number) => {
            res.data.datasets[i] = { ...res.data.datasets[i], ...dataStyle };
            category.data.forEach((dat: any, j: number) => {
              category.data[j].x = moment(dat.x);
            });
          });
          setData(res.data);
          setLoading(false);
        })
        .catch(err => console.error(err.message));
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="mb-3 mx-0 px-0">
      <Card>
        <CardHeader className="text-left text-uppercase text-muted">{cardTitle}</CardHeader>
        <CardBody className="m-0">
          {/*@ts-ignore*/}
          <Line
            data={data}
            options={{
              scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      unit: "month",
                    },
                    scaleLabel: {
                      display: !!xLabel,
                      labelString: xLabel,
                    },
                  },
                ],
                yAxes: [
                  {
                    scaleLabel: {
                      display: !!yLabel,
                      labelString: yLabel,
                    },
                  },
                ],
              },
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

CasesLinePlot.defaultProps = {
  xLabel: "",
  yLabel: "",
};

export default CasesLinePlot;
