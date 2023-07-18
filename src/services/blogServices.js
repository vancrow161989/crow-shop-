import http, { requestWithAuth } from "./httpServices";
import { createRequest } from "./httpServices";
import config from "../../config.json";

const { apiUrl } = config;

const apiEndPoint = `${apiUrl}/blogs`;
const requestManager = createRequest();

export async function addNewBlog({ title, content, postImage, user }) {
  const formData = createData(title, content, postImage, user);
  const abortController = new AbortController();
  const newRequest = await http.post(
    `${apiEndPoint}?populate=image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      signal: abortController.signal
    }
  );
  const successMsg = "Successfully Added";
  console.log("newRequest blog", newRequest);
  await requestManager.makeRequest(newRequest, successMsg, abortController);
}

export async function updateSinglePost({ title, content, postImage }, id) {
  const formData = createData(title, content, postImage);
  const abortController = new AbortController();
  const newRequest = requestWithAuth.put(`${apiEndPoint}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    signal: abortController.signal
  });
  const successMsg = "Successfully Updated";
  await requestManager.makeRequest(newRequest, successMsg, abortController);
}

export async function deleteBlog(id) {
  return await requestWithAuth.delete(`${apiEndPoint}/${id}`);
}

export async function getPostById(id) {
  return await http.get(`${apiEndPoint}/${id}?populate=image`);
}

function createData(title, content, postImage, user) {
  const formData = new FormData();
  formData.append("data", JSON.stringify({ title, content, user }));
  formData.append("files.image", postImage[0]);
  return formData;
}
