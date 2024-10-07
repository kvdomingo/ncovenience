import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";

const baseURL = "/api";

const axi = axios.create({ baseURL });

export const api = {
  data: {
    getProvinces(): Promise<AxiosResponse<Record<string, any>>> {
      return axios.get(
        "https://raw.githubusercontent.com/macoymejia/geojsonph/master/Province/Provinces.json",
      );
    },
    cases(): Promise<AxiosResponse<Record<string, any>>> {
      return axi.get("/cases");
    },
    numbers(): Promise<AxiosResponse<Record<string, number>>> {
      return axi.get("/numbers");
    },
    counts(): Promise<AxiosResponse<Record<string, number>>> {
      return axi.get("/counts");
    },
    timePlot(): Promise<AxiosResponse<Record<string, any>>> {
      return axi.get("/time-plot");
    },
    worldPlot(): Promise<AxiosResponse<Record<string, any>>> {
      return axi.get("/world-plot");
    },
    deltaPlot(): Promise<AxiosResponse<Record<string, any>>> {
      return axi.get("/delta-plot");
    },
    agePlot(): Promise<AxiosResponse<Record<string, any>>> {
      return axi.get("/age-plot");
    },
    metroPlot(): Promise<AxiosResponse<Record<string, any>>> {
      return axi.get("/metro-plot");
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      placeholderData: keepPreviousData,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 10, // 10 mins
    },
    mutations: {
      retry: false,
    },
  },
});
