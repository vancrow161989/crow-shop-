import http from "./httpServices";
import { createRequest } from "./httpServices";
import { baseUrl, contactApiUrl } from "../../config.json";

const apiUrl = `${baseUrl}${contactApiUrl}`;

const requestManager = createRequest();

export async function addEmail(formData) {
  const abortController = new AbortController();
  const data = createData(formData);
  const newRequest = http.post(`${apiUrl}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    signal: abortController.signal
  });

  const successMsg = "Successfully Sent";
  await requestManager.makeRequest(newRequest, successMsg, abortController);
}

function createData(formData) {
  const data = new FormData();
  data.append("data", JSON.stringify(formData));

  return data;
}
