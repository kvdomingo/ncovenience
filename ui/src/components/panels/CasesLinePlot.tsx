import { api } from "@/api";
import Loading from "@/components/common/Loading";
import { useQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";
import {
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardHeader as CardHeader,
} from "mdbreact";
import moment from "moment";
import { Line } from "react-chartjs-2";

interface CasesLinePlotProps {
  endpoint: "time-plot" | "delta-plot" | "world-plot";
  cardTitle: string;
  xLabel: string;
  yLabel: string;
}

function CasesLinePlot({ endpoint, cardTitle, xLabel, yLabel }: CasesLinePlotProps) {
  const query = useQuery({
    queryKey: ["plot", endpoint],
    queryFn: async () => {
      const ep = async () => {
        switch (endpoint) {
          case "time-plot":
            return await api.data.timePlot();
          case "delta-plot":
            return await api.data.deltaPlot();
          case "world-plot":
            return await api.data.worldPlot();
        }
      };

      const res = await ep();

      try {
        const dataStyle = {
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
        return res;
      } catch (e) {
        if (e instanceof AxiosError) {
          console.error(e.message);
        } else {
          console.error(e);
        }
      }
    },
  });

  return query.isLoading ? (
    <Loading />
  ) : (
    <div className="mx-0 mb-3 px-0">
      <Card>
        <CardHeader className="text-left text-muted text-uppercase">
          {cardTitle}
        </CardHeader>
        <CardBody className="m-0">
          <Line
            data={query.data?.data ?? []}
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
