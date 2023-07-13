import http from "./httpServices";
import config from "../../config.json";

const { apiUrl } = config;

const apiEndPoint = `${apiUrl}/home-sliders`;

export function getMainSlider() {
  return http.get(apiEndPoint);
}
