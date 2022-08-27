import { useEffect, useState } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { AxiosResponse } from "axios";
import { MDBCard as Card, MDBCardBody as CardBody, MDBCardHeader as CardHeader } from "mdbreact";
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
  const [labels, setLabels] = useState<any[]>([]);

  useEffect(() => {
    let ep = () => {
      if (endpoint) {
        switch (endpoint) {
          case "age-plot": {
            return api.data.agePlot();
          }
          case "metro-plot": {
            return api.data.metroPlot();
          }
        }
      }
    };

    if (ep) {
      ep()!
        .then((res: AxiosResponse) => {
          let { labels, datasets } = res.data;
          setLabels(labels);
          setData(datasets);
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
          <HorizontalBar
            data={data}
            options={{
              scales: {
                xAxes: [
                  {
                    stacked: true,
                    scaleLabel: {
                      display: !!xLabel,
                      labelString: xLabel,
                    },
                  },
                ],
                yAxes: [
                  {
                    type: "category",
                    labels: labels,
                    stacked: true,
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
