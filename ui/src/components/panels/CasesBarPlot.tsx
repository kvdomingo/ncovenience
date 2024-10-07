import { api } from "@/api";
import Loading from "@/components/common/Loading";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardHeader as CardHeader,
} from "mdbreact";
import { HorizontalBar } from "react-chartjs-2";

interface CasesBarPlotProps {
  endpoint: "age-plot" | "metro-plot";
  cardTitle: string;
  xLabel: string;
  yLabel: string;
}

function CasesBarPlot({ endpoint, cardTitle, xLabel, yLabel }: CasesBarPlotProps) {
  const query = useQuery({
    queryKey: ["plot", endpoint],
    queryFn: async () => {
      const ep = async () => {
        switch (endpoint) {
          case "age-plot": {
            return await api.data.agePlot();
          }
          case "metro-plot": {
            return await api.data.metroPlot();
          }
        }
      };

      try {
        const res = await ep();
        return res.data;
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
          {/*@ts-ignore*/}
          <HorizontalBar
            data={query.data?.datasets}
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
                    labels: query.data?.datasets.labels ?? [],
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

CasesBarPlot.defaultProps = {
  xLabel: "",
  yLabel: "",
};

export default CasesBarPlot;
