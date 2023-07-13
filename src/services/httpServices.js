import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../config.json";
import { getTokenLocalStorage } from "./authService";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError && !axios.isCancel(error)) {
    toast.error(`An unexpected server error occured: ${error.message}`);
  }
  return Promise.reject(error);
});

export default {
  request: axios.request,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  isCancel: axios.isCancel
};

const token = getTokenLocalStorage();

export const requestWithAuth = axios.create({
  baseUrl,
  headers: {
    common: {
      Authorization: `Bearer ${token}`
    }
  }
});

export function createRequest() {
  let isRequesting = false;

  async function makeRequest(newRequest, successMsg, abortController) {
    if (isRequesting) {
      abortController.abort();
      return;
    }

    try {
      isRequesting = true;

      const response = await newRequest;
      toast.success(successMsg, {
        position: "top-center",
        hideProgressBar: true
      });
      isRequesting = false;
      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("Operation canceled");
      }
      console.error("error", error);
      isRequesting = false;
    }
  }

  return { makeRequest };
}
