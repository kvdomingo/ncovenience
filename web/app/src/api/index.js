import axios from "axios";

const baseURL = "/api";

const axi = axios.create({ baseURL });

const api = {
  data: {
    token() {
      return axi.get("/token");
    },
    getProvinces() {
      return axios.get("https://raw.githubusercontent.com/macoymejia/geojsonph/master/Province/Provinces.json");
    },
    cases() {
      return axi.get("/cases");
    },
    numbers() {
      return axi.get("/numbers");
    },
    counts() {
      return axi.get("/counts");
    },
    timePlot() {
      return axi.get("/time-plot");
    },
    worldPlot() {
      return axi.get("/world-plot");
    },
    deltaPlot() {
      return axi.get("/delta-plot");
    },
    agePlot() {
      return axi.get("/age-plot");
    },
    metroPlot() {
      return axi.get("/metro-plot");
    },
  },
};

export default api;
