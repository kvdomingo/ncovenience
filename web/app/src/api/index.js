import axios from "axios";

const baseURL = "/api";

const axiosInstance = axios.create({ baseURL });

const api = {
  data: {
    cases() {
      return axiosInstance.get("/cases");
    },
    numbers() {
      return axiosInstance.get("/numbers");
    },
    counts() {
      return axiosInstance.get("/counts");
    },
    timePlot() {
      return axiosInstance.get("/time-plot");
    },
    worldPlot() {
      return axiosInstance.get("/world-plot");
    },
    deltaPlot() {
      return axiosInstance.get("/delta-plot");
    },
    agePlot() {
      return axiosInstance.get("/age-plot");
    },
    metroPlot() {
      return axiosInstance.get("/metro-plot");
    },
  },
};

export default api;
